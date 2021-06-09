import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isEmail } from 'class-validator';
import { User } from 'src/users/user.entity';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.findUser(username);
    if (user && user.password === pass) {
      const type = await this.usersService.findUserType(user);
      const { id, username, email } = user;
      return { id, username, email, type };
    }
    return null;
  }

  // @TODO: Remember to make working dual auth method
  async findUser(username: string): Promise<User> {
    if (isEmail(username)) {
      return await this.usersService.findByEmail(username);
    } else {
      return await this.usersService.findByUsername(username);
    }
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.type,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
