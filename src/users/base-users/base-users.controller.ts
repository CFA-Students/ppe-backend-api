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

import { BaseUsersService } from './base-users.service';
import { BaseUsersDto } from './base-users.dto';
import { BaseUserDto } from './base-user.dto';

@Controller('users')
export class BaseUsersController {
  constructor(private readonly baseUsersService: BaseUsersService) {}

  @Get()
  async findAll(): Promise<BaseUsersDto> {
    return await this.baseUsersService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number | string): Promise<BaseUserDto> {
    if (typeof id === 'number')
      return await this.baseUsersService.findById(id);
    else if (typeof id === 'string')
      return await this.baseUsersService.find(id);
    else throw new BadRequestException();
  }

  @Post()
  @HttpCode(201)
  async insert(@Body('user') baseUser: BaseUserDto): Promise<void> {
    await this.baseUsersService.insert(baseUser);
  }

  @Put()
  async update(@Body('user') baseUser: BaseUserDto): Promise<void> {
    await this.baseUsersService.update(baseUser);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.baseUsersService.delete(id);
  }
}
