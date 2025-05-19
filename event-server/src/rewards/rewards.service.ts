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

    const existingReward = await this.rewardModel.findOne({ userId, eventId });
    if (existingReward) {
      return 'Reward already granted for this event.';
    }

    const monsterCount = await this.monsterModel.countDocuments({ userId, eventId });
    if (monsterCount < 10) {
      return 'Not enough monsters defeated yet.';
    }

    const createdReward = new this.rewardModel({
      userId,
      eventId,
      title: 'Boss Slayer',
      type: 'point',         // ✅ 고정값 or 외부 입력값으로 바꿀 수도 있음
      quantity: 100,         // ✅ 고정값 or 외부 입력값으로 바꿀 수도 있음
      status: 'PENDING',
    });

    return createdReward.save();
  }

    async findByUser(userId: string): Promise<Reward[]> {
      return this.rewardModel.find({ userId }).exec();
    }

  async findAll(): Promise<Reward[]> {
    return this.rewardModel.find().exec();
  }
}
