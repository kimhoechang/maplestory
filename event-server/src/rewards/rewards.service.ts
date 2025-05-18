import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward } from './reward.schema';
import { Monster } from '../monsters/monster.schema';

@Injectable()
export class RewardsService {
  constructor(
    @InjectModel(Reward.name) private rewardModel: Model<Reward>,
    @InjectModel(Monster.name) private monsterModel: Model<Monster>,
  ) {}

  async requestReward(data: Partial<Reward>): Promise<Reward | string> {
    const { userId, eventId } = data;

    if (!userId || !eventId) {
      throw new BadRequestException('userId and eventId are required');
    }

    // 중복 보상 요청 방지
    const existingReward = await this.rewardModel.findOne({ userId, eventId });
    if (existingReward) {
      return 'Reward already granted for this event.';
    }

    // 몬스터 10마리 이상 처치 조건 체크
    const monsterCount = await this.monsterModel.countDocuments({ userId, eventId });
    if (monsterCount < 10) {
      return 'Not enough monsters defeated yet.';
    }

    // 보상 생성 및 저장
    const createdReward = new this.rewardModel({
      userId,
      eventId,
      title: 'Boss Slayer',
      status: 'PENDING',
    });

    return createdReward.save();
  }

  async findByUser(userId: string): Promise<Reward[]> {
    return this.rewardModel.find({ userId }).exec();
  }
}
