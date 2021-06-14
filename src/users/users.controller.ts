import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users/all')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    const allUsers = await this.usersService.findAll();
    if (allUsers.length <= 0)
      throw new HttpException('No users found', HttpStatus.NOT_FOUND);
    return allUsers;
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user)
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    return user;
  }

  @Post()
  @HttpCode(201)
  async insert(@Body('user') user: User): Promise<void> {
    await this.usersService.insert(user);
  }

  @Put()
  async update(@Body('user') user: User): Promise<void> {
    await this.usersService.update(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.usersService.delete(id);
  }
}
