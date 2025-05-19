import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';
import { Reward, RewardSchema } from './reward.schema';
import { Monster, MonsterSchema } from '../monsters/monster.schema';
import { Event, EventSchema } from '../events/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reward.name, schema: RewardSchema },
      { name: Monster.name, schema: MonsterSchema },
      { name: Event.name, schema: EventSchema },
    ]),
  ],
  providers: [RewardsService],
  controllers: [RewardsController],
  exports: [RewardsService],
})
export class RewardsModule {}