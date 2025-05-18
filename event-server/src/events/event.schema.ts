import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  condition: string; // 예: "몬스터 10마리 처치"

  @Prop({ required: true })
  rewardTitle: string;

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  endAt: Date;
  
  @Prop({ required: true })
creatorId: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);