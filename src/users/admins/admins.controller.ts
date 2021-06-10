import {
  BadRequestException,
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
import { AdminDto } from './admin.dto';
import { Admin } from './admin.entity';

@Controller('users/admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  async findAll(): Promise<Admin[]> {
    const allAdmins = await this.adminsService.findAll();
    if (allAdmins.length <= 0) {
      throw new HttpException(
        'No clients found',
        HttpStatus.NOT_FOUND
      );
    }
    return allAdmins;
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number): Promise<Admin> {
    const client = await this.adminsService.findById(id);
    if (!client)
      throw new HttpException(
        'No client found',
        HttpStatus.NOT_FOUND
      );
    return client;
  }

  @Post()
  @HttpCode(201)
  async insert(@Body('user') admin: AdminDto): Promise<void> {
    await this.adminsService.insert(admin);
  }

  @Put()
  async update(@Body('user') admin: AdminDto): Promise<void> {
    await this.adminsService.update(admin);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.adminsService.delete(id);
  }
}
