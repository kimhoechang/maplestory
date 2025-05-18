import {
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDocument } from './user.schema';
import { AuthService } from '../auth/auth.service';  // AuthService 임포트

@Controller('users')
export class UsersController {
  constructor(private authService: AuthService) {}  // AuthService 주입

  // 로그인 시 토큰 발급
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const user = req.user as UserDocument;
    // 토큰 생성 후 반환
    return this.authService.login(user);
  }

  // 토큰으로 사용자 정보 확인
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Request() req) {
    const user = req.user as UserDocument;
    return {
      id: user._id,
      email: user.email,
    };
  }
}