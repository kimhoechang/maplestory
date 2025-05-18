import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() eventData: Partial<Event>) {
    return this.eventsService.create({ ...eventData, creatorId: req.user.userId });
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }
}