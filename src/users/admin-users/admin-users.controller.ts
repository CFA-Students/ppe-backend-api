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

import { AdminUsersService } from './admin-users.service';
import { AdminUsersDto } from './admin-users.dto';
import { AdminUserDto } from './admin-user.dto';

@Controller('users')
export class AdminUsersController {
  constructor(
    private readonly adminUsersService: AdminUsersService
  ) {}

  @Get()
  async findAll(): Promise<AdminUsersDto> {
    return await this.adminUsersService.findAll();
  }

  @Get(':id')
  async find(
    @Param('id') id: number | string
  ): Promise<AdminUserDto> {
    if (typeof id === 'number')
      return await this.adminUsersService.findById(id);
    else if (typeof id === 'string')
      return await this.adminUsersService.find(id);
    else throw new BadRequestException();
  }

  @Post()
  @HttpCode(201)
  async insert(@Body('user') adminUser: AdminUserDto): Promise<void> {
    await this.adminUsersService.insert(adminUser);
  }

  @Put()
  async update(@Body('user') adminUser: AdminUserDto): Promise<void> {
    await this.adminUsersService.update(adminUser);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.adminUsersService.delete(id);
  }
}
