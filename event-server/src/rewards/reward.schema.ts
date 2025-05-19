import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Reward extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  type: 'point' | 'item' | 'coupon';

  @Prop({ required: true })
  quantity: number;

  @Prop({ type: Object })
  metadata?: Record<string, any>;

  @Prop({ default: 'PENDING' })
  status: 'PENDING' | 'APPROVED' | 'REJECTED';

  @Prop({ default: Date.now })
  requestedAt: Date;

  @Prop()
  approvedAt?: Date;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
