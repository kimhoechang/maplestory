import { Controller, Post, Get, Body, Query, UseGuards, Request } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  // JWT 인증 적용 (필요시)
  @UseGuards(JwtAuthGuard)
  @Post('request')
  async requestReward(@Request() req, @Body() body: { eventId: string }) {
    const userId = req.user.userId;
    return this.rewardsService.requestReward({ userId, eventId: body.eventId });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findByUser(@Request() req) {
    const userId = req.user.userId;
    return this.rewardsService.findByUser(userId);
  }
}
