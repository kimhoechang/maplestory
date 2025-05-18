import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('monsters')
export class MonstersController {
  constructor(private readonly monstersService: MonstersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('defeat')
  async defeatMonster(@Request() req, @Body() body: { name: string; eventId: string }) {
    return this.monstersService.defeatMonster(req.user._id, body.name, body.eventId);
  }
}