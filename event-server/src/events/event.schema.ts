import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  condition?: string;

  @Prop({ required: true, enum: ['ACTIVE', 'INACTIVE'], default: 'INACTIVE' })
  status: 'ACTIVE' | 'INACTIVE';

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  creatorId: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);