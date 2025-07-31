import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class CartService {
  constructor(private readonly redisService: RedisService) { }
   private getKey(userId: string) {
    return `cart:${userId}`;
  }

   private async saveCart(userId: string, cart: any[]) {
    const key = this.getKey(userId);
    await this.redisService.set(key, JSON.stringify(cart));
  }
  async getCart(userId: string): Promise<any[]> {
    const key = this.getKey(userId);
    const data = await this.redisService.get(key);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch (err) {
      console.error('🛑 Redis data parse error:', err, 'raw:', data);
      return [];
    }
  }

  async clearCart(userId: string) {
    await this.redisService.del(`cart:${userId}`);
    return { message: 'Sepet temizlendi' };
  }


  async addToCart(userId: string, product: any, quantity: number) {
    const mevcutSepet = await this.getCart(userId) || [];
    const mevcutIndex = mevcutSepet.findIndex((item: any) => item.productId === product.productId);
    if (mevcutIndex !== -1) {
      mevcutSepet[mevcutIndex].quantity += quantity;
    } else {
      mevcutSepet.push({ ...product, quantity });
    }
    await this.saveCart(userId, mevcutSepet);
    return { message: 'Ürün sepete eklendi', cart: mevcutSepet };
  }



  async decreaseItem(userId: string, productId: string) {
    const cart = await this.getCart(userId);
    const item = cart.find(i => i.productId === productId);

    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        
        return this.removeItem(userId, productId);
      }
      await this.saveCart(userId, cart);
    }
    return { message: 'Adet azaltıldı' };
  }
  
  async removeItem(userId: string, productId: string) {
    let cart = await this.getCart(userId);
    cart = cart.filter(i => i.productId !== productId);
    await this.saveCart(userId, cart);
    return { message: 'Ürün sepetten kaldırıldı' };
  }
}
