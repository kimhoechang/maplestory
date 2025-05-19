import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { EventsModule } from './events/events.module';
import { MonstersModule } from './monsters/monsters.module';
import { RewardsModule } from './rewards/rewards.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    EventsModule,
    MonstersModule,
    RewardsModule,
  ],
})
export class AppModule {}