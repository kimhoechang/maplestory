import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';  // 경로는 상황에 맞게 조정
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      console.log('validateUser result:', result);
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('login user:', user);
    const payload = { email: user.email, sub: user._id?.toString() ?? user.id };
    console.log('JWT payload:', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: { email: string; password: string }) {
    const { email, password } = createUserDto;
    return this.usersService.createUser(email, password);
  }
}