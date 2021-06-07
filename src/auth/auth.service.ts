import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BaseUsersService } from 'src/users/base-users/base-users.service';

@Injectable()
export class AuthService {
  constructor(
    private baseUsersService: BaseUsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.baseUsersService.find(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
