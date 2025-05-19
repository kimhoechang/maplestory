import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward } from './reward.schema';
import { Monster } from '../monsters/monster.schema';
import { Event } from '../events/event.schema'; // ✅ 이벤트 모델 임포트

@Injectable()
export class RewardsService {
  constructor(
    @InjectModel(Reward.name) private rewardModel: Model<Reward>,
    @InjectModel(Monster.name) private monsterModel: Model<Monster>,
    @InjectModel(Event.name) private eventModel: Model<Event>, // ✅ 이벤트 모델 주입
  ) {}

  async requestReward(data: Partial<Reward>): Promise<Reward | string> {
    const { userId, eventId } = data;
    if (!userId || !eventId) {
      throw new BadRequestException('userId and eventId are required');
    }

    // ✅ 1. 이벤트 유효성 및 상태 확인
    const event = await this.eventModel.findById(eventId) as unknown as Event;
    if (!event?.isActive) {
      return 'This event is currently inactive.';
    }

    // ✅ 2. 중복 보상 방지
    const existingReward = await this.rewardModel.findOne({ userId, eventId });
    if (existingReward) {
      return 'Reward already granted for this event.';
    }

    // ✅ 3. 조건 확인: 몬스터 10마리 이상
    const monsterCount = await this.monsterModel.countDocuments({ userId, eventId });
    if (monsterCount < 10) {
      return 'Not enough monsters defeated yet.';
    }

    // ✅ 4. 보상 생성
    const createdReward = new this.rewardModel({
      userId,
      eventId,
      title: 'Boss Slayer',
      type: 'point',         // 타입 추가
      quantity: 100,         // 수량 추가
      status: 'PENDING',
    });

    return createdReward.save();
  }

  // ✅ 유저의 보상 이력 조회
  async findByUser(userId: string): Promise<Reward[]> {
    return this.rewardModel.find({ userId }).exec();
  }

  // ✅ 전체 보상 이력 조회
  async findAll(): Promise<Reward[]> {
    return this.rewardModel.find().exec();
  }
}