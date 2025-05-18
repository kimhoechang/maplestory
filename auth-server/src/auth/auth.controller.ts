import { Controller, Post, Body, Get, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')  // 인증 불필요
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')  // 인증 불필요
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.authService.login(user);  // JWT 발급
  }

  @UseGuards(JwtAuthGuard)  // JWT 있어야 접근 가능
  @Get('protected')
  getProtected(@Req() req) {
    return {
      message: 'You are authenticated!',
      user: req.user,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)  // JWT + 권한 체크
  @Roles('ADMIN')
  @Get('admin-only')
  getAdminOnly(@Req() req) {
    return {
      message: 'Welcome, Admin!',
      user: req.user,
    };
  }
}