import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Monster } from './monster.schema';
import { Reward } from '../rewards/reward.schema';

@Injectable()
export class MonstersService {
  constructor(
    @InjectModel(Monster.name) private monsterModel: Model<Monster>,
    @InjectModel(Reward.name) private rewardModel: Model<Reward>,
  ) {}

  async create(monsterData: Partial<Monster>): Promise<Monster> {
    const created = new this.monsterModel(monsterData);
    return created.save();
  }

  async findByUser(userId: string): Promise<Monster[]> {
    return this.monsterModel.find({ userId }).exec();
  }

  async defeatMonster(userId: string, monsterName: string, eventId: string): Promise<string> {
    // 1. 몬스터 처치 저장
    await this.monsterModel.create({ userId, name: monsterName });

    // 2. 유저의 해당 이벤트 몬스터 수 계산
    const count = await this.monsterModel.countDocuments({ userId });

    // 3. 10마리째면 보상 발급
    if (count === 10) {
      await this.rewardModel.create({
        userId,
        eventId,
        title: 'Boss Slayer',
        // status, requestedAt 은 default 값 사용됨
      });
      return 'Monster defeated. 🎉 Reward granted!';
    }

    return 'Monster defeated.';
  }
}