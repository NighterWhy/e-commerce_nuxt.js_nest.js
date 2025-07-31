import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post('add')
  async add(@Body() body: any) {
    const { userId, product, quantity } = body;
    return this.cartService.addToCart(userId, product, quantity);
  }

  @Get(':userId')
  async get(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Delete(':userId')
  async clear(@Param('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }
  @Patch('decrease')
  async decreaseItem(@Body() body: { userId: string; productId: string }) {
    return this.cartService.decreaseItem(body.userId, body.productId);
  }

  @Delete('remove')
  async removeItem(@Body() body: { userId: string; productId: string }) {
    return this.cartService.removeItem(body.userId, body.productId);
  }
}
