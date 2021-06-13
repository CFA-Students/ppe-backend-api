import {
  Post,
  Controller,
  UseGuards,
  Body,
  Get,
  Request,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard, Public } from './jwt-auth.guard';
import { JwtTokenDto } from './dto/auth.dto';
import { UserLoginDto } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController {
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
