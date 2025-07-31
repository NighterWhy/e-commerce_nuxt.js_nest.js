import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,

        private readonly redisService: RedisService

    ) { }

    async create(productDto: any): Promise<Product> {
        const created = new this.productModel(productDto);
        const saved = await created.save();

        await this.redisService.set(`product:${saved._id}`, saved)
        console.log(`Redise Yazıldı product:${saved._id}`);

        return saved

    }
  

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }
    async findById(id: string): Promise<Product | null> {
        return this.productModel.findById(id).exec();
    }

    async update(id: string, updateDto: any): Promise<Product | null> {

        const updated = await this.productModel.findOneAndUpdate(
            { _id: id },
            updateDto,
            { new: true },
        );

        if (updated) {
            await this.redisService.set(`product:${updated._id}`, updated);
            console.log('Redis güncellendi')
        }

        return updated;
    }
    async decreaseStock(productId: string, quantity: number): Promise<void> {
        await this.productModel.findByIdAndUpdate(
            productId,
            { $inc: { stock: -quantity } },
            { new: true }
        );
    }
     async findByCategory(category: string) {
        return this.productModel.find({ category }).exec();
    }


}
