import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../users/user.schema';

@Controller('rewards')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  // ✅ USER: 보상 요청
  @Post()
  @Roles(Role.USER)
  request(
    @Request() req,
    @Body() body: { eventId: string; type: 'point' | 'item' | 'coupon'; quantity: number },
  ) {
    return this.rewardsService.requestReward({
      userId: req.user.userId,
      eventId: body.eventId,
      type: body.type,
      quantity: body.quantity,
    });
  }

  // ✅ ADMIN, OPERATOR, AUDITOR: 전체 이력
  @Get('all')
  @Roles(Role.OPERATOR, Role.AUDITOR, Role.ADMIN)
  findAll() {
    return this.rewardsService.findAll();
  }

  // ✅ USER: 본인 이력
  @Get()
  @Roles(Role.USER)
  findByUser(@Request() req) {
    return this.rewardsService.findByUser(req.user.userId);
  }
}
