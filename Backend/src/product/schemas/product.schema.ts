import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  stock: number;

  @Prop({required:true})
  seller: string;

  @Prop({required:true})
  photo :string;

  @Prop({required:true})
  category:string;

  @Prop()
  description: string;
  
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.post('save', function (doc) {
  console.log(`Ürün kaydedildi: ${doc.name} - Stok: ${doc.stock}`);
});

ProductSchema.post('findOneAndUpdate', function (doc) {
  if (doc) {
    console.log(`Ürün güncellendi: ${doc.name} - Yeni stok: ${doc.stock}`);
  }
});
