import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../users/user.schema';

@Controller('events')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // ✅ OPERATOR,ADMIN만 이벤트 등록 가능
  @Post()
  @Roles(Role.OPERATOR, Role.ADMIN)
  create(@Request() req, @Body() eventData: Partial<Event>) {
    return this.eventsService.create({
      ...eventData,
      creatorId: req.user.userId,
      isActive: eventData.isActive ?? true,
    });
  }

  // ✅ 전체 유저가 목록 조회 가능
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }
}
