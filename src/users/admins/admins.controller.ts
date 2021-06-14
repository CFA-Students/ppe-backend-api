import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { AdminsService } from './admins.service';
import { Admin } from './admin.entity';

@Controller('users/admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  async findAll(): Promise<Admin[]> {
    const allAdmins = await this.adminsService.findAll();
    if (allAdmins.length <= 0) {
      throw new HttpException(
        'No admins found',
        HttpStatus.NOT_FOUND
      );
    }
    return allAdmins;
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Admin> {
    const admin = await this.adminsService.findById(id);
    if (!admin)
      throw new HttpException('No admin found', HttpStatus.NOT_FOUND);
    return admin;
  }

  @Post()
  @HttpCode(201)
  async insert(@Body('admin') admin: Admin): Promise<void> {
    await this.adminsService.insert(admin);
  }

  @Put()
  async update(@Body('admin') admin: Admin): Promise<void> {
    await this.adminsService.update(admin);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.adminsService.delete(id);
  }
}
