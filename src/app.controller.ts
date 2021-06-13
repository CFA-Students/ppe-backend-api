import {
  Get,
  Post,
  Controller,
  Request,
  UseGuards,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard, Public } from './auth/jwt-auth.guard';
import { JwtTokenDto } from './auth/dto/auth.dto';
import { UserLoginDto } from './users/dto/user.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() userLogin: UserLoginDto): Promise<JwtTokenDto> {
    return this.authService.login(userLogin);
  }

  @Public()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    return req;
  }
}
