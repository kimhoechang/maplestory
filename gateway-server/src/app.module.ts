import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { TestController } from './test.controller';
import { GatewayService } from './app.service';  // GatewayService가 app.service.ts에 정의된 경우 이렇게 import
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    HttpModule, // HttpModule 꼭 추가
  ],
  controllers: [AppController, TestController],
  providers: [GatewayService, JwtStrategy],  // AppService는 필요 없으면 삭제
})
export class AppModule {}