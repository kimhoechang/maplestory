import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: any): string {
    const payload = {
    sub: user._id,
    username: user.username,
    roles: user.roles, // 👈 반드시 포함
  };
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }
}