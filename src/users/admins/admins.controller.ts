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
import { UsersService } from '../users.service';

@Controller('users/admins')
export class AdminsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly adminsService: AdminsService
  ) {}

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
  async insert(@Body() admin: Admin): Promise<void> {
    await this.usersService.insert(admin.user);
    await this.adminsService.insert(admin);
  }

  @Put()
  async update(@Body() newAdmin: Admin): Promise<void> {
    const admin = await this.adminsService.update(newAdmin);
    this.testEntityExists(admin);
  }

  @Delete(':id')
  async deleteWithUser(
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    const admin = await this.adminsService.deleteWithUser(id);
    this.testEntityExists(admin);

    await this.usersService.delete(id);
  }

  private testEntityExists(entity: Admin) {
    if (!entity)
      throw new HttpException('No admin found', HttpStatus.NOT_FOUND);
  }
}
