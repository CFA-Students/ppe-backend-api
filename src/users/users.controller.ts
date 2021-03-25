import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersDto } from './users.dto';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UsersDto> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<UserDto> {
    return this.usersService.find(id);
  }

  @Post()
  async create(@Body('user') user: UserDto): Promise<void> {
    this.usersService.create(user);
  }

  @Put()
  async update(@Body('user') user: UserDto): Promise<void> {
    this.usersService.update(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    this.usersService.delete(id);
  }
}
