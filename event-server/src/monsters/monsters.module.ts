import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonstersService } from './monsters.service';
import { MonstersController } from './monsters.controller';
import { Monster, MonsterSchema } from './monster.schema';
import { Reward, RewardSchema } from '../rewards/reward.schema';  // 보통 rewards 폴더 위치에 맞게 경로 조정

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Monster.name, schema: MonsterSchema }]),
    MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema }]),  // 여기에 추가
  ],
  providers: [MonstersService],
  controllers: [MonstersController],
  exports: [MonstersService],
})
export class MonstersModule {}