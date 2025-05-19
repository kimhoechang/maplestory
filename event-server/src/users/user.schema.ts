import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  USER = 'USER',
  OPERATOR = 'OPERATOR',
  AUDITOR = 'AUDITOR',
  ADMIN = 'ADMIN',
}

// 이 아래에 스키마가 있다면 이렇게 사용
@Schema()
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], enum: Role, default: [Role.USER] })
  roles: Role[];
}