import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './event.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
  ) {}

  async create(data: Partial<Event>): Promise<Event> {
    const created = new this.eventModel(data);
    return created.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }
}