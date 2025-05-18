import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Monster extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: Date.now })
  defeatedAt: Date;

  @Prop({ required: true })
  eventId: string;
}

export const MonsterSchema = SchemaFactory.createForClass(Monster);