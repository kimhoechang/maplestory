import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { GatewayService } from './app.service';  // GatewayService import

@Controller('test')
export class AppController {
  constructor(private readonly gatewayService: GatewayService) {}

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  async getProtected(@Req() req) {
    const authHeader = req.headers['authorization'];
    return this.gatewayService.proxyToAuthServer('/auth/protected', 'GET', null, authHeader);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('admin-only')
  async getAdminOnly(@Req() req) {
    const authHeader = req.headers['authorization'];
    return this.gatewayService.proxyToAuthServer('/auth/admin-only', 'GET', null, authHeader);
  }

  @UseGuards(JwtAuthGuard)
  @Post('event/create')
  async createEvent(@Req() req, @Body() body: any) {
    const authHeader = req.headers['authorization'];
    return this.gatewayService.proxyToEventServer('/events/create', 'POST', body, authHeader);
  }
}