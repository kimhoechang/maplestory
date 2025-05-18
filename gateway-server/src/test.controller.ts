import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('test')
export class TestController {
  // @UseGuards(JwtAuthGuard)
  // @Get('protected')
  // getProtected(@Request() req) {
  //   return { message: 'You are authenticated!', user: req.user };
  // }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('ADMIN')
  // @Get('admin-only')
  // getAdminOnly(@Request() req) {
  //   return { message: 'You are an admin!', user: req.user };
  // }
}