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

import { AdminsService } from './admins.service';
import { AdminsDto } from './admins.dto';
import { AdminDto } from './admin.dto';

@Controller('users/admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  // @Get()
  // async findAll(): Promise<AdminsDto> {
  //   return await this.adminsService.findAll();
  // }

  @Get(':id')
  async find(@Param('id') id: number | string): Promise<AdminDto> {
    if (typeof id === 'number')
      return await this.adminsService.findById(id);
    // else if (typeof id === 'string')
    //   return await this.adminsService.find(id);
    else throw new BadRequestException();
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
