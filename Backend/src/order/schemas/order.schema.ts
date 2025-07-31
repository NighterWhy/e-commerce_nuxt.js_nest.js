import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, type: [{ productId: String, quantity: Number }] })
  items: { productId: string; quantity: number }[];

  @Prop({ required: true })
  totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);


OrderSchema.post('save', function(doc){
    console.log(`Siparis Verildi  ID : ${doc._id} Kullanici : ${doc.userId}`)
});