import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersDto } from './users.dto';
import { UserDto } from './user.dto';

@Controller('users-all')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UsersDto> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number | string): Promise<UserDto> {
    if (typeof id === 'number')
      return await this.usersService.findById(id);
    else if (typeof id === 'string')
      return await this.usersService.find(id);
    else throw new BadRequestException();
  }

  @Post()
  @HttpCode(201)
  async insert(@Body('user') user: UserDto): Promise<void> {
    await this.usersService.insert(user);
  }

  @Put()
  async update(@Body('user') user: UserDto): Promise<void> {
    await this.usersService.update(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.usersService.delete(id);
  }
}
