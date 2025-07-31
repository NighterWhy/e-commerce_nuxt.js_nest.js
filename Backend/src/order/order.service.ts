import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { Model } from 'mongoose';
import { RedisService } from 'src/redis/redis.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<Order>,
        private readonly redisService: RedisService,
        private readonly productService: ProductService,
    ) { }

    async createOrder(userId: string): Promise<any> {
        const cartKey = `cart:${userId}`;
        
        const raw = await this.redisService.get(cartKey);
        let cartItems: any[];
        try {
            cartItems = raw ? JSON.parse(raw) : [];
        } catch {
            cartItems = [];
        }

        if (!cartItems.length) {
            return { message: 'Sepetiniz Boş.' };
        }

        let totalPrice = 0;

        for (const item of cartItems) {
            const product = await this.productService.findById(item.productId);

            if (!product) {
                throw new Error(`ürün bulunamadı: ${item.productId}`);
            }

            const itemTotal = item.quantity * product.price;
            totalPrice += itemTotal;

            await this.productService.decreaseStock(product.id, item.quantity);

            const updatedProduct = await this.productService.findById(product.id);
            await this.redisService.set(`product:${product.id}`, updatedProduct);
        }

        const order = new this.orderModel({
            userId,
            items: cartItems,
            totalPrice,
        });

        const savedOrder = await order.save();

        await this.redisService.del(cartKey);
        console.log(`Sepet Redisten Silindi ${cartKey}`);

        return { message: 'sipariş oluşturuldu', order: savedOrder };
    }

}
