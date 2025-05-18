import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { MonstersModule } from './monsters/monsters.module';
import { RewardsModule } from './rewards/rewards.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/event-system'), // 접속 URL 수정 가능
    EventsModule,
    MonstersModule,
    RewardsModule,
  ],
})
export class AppModule {}