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

import { SupplierUsersService } from './supplier-users.service';
import { SupplierUsersDto } from './supplier-users.dto';
import { SupplierUserDto } from './supplier-user.dto';

@Controller('users')
export class SupplierUsersController {
  constructor(
    private readonly supplierUsersService: SupplierUsersService
  ) {}

  @Get()
  async findAll(): Promise<SupplierUsersDto> {
    return await this.supplierUsersService.findAll();
  }

  @Get(':id')
  async find(
    @Param('id') id: number | string
  ): Promise<SupplierUserDto> {
    if (typeof id === 'number')
      return await this.supplierUsersService.findById(id);
    else if (typeof id === 'string')
      return await this.supplierUsersService.find(id);
    else throw new BadRequestException();
  }

  @Post()
  @HttpCode(201)
  async insert(
    @Body('user') supplierUser: SupplierUserDto
  ): Promise<void> {
    await this.supplierUsersService.insert(supplierUser);
  }

  @Put()
  async update(
    @Body('user') supplierUser: SupplierUserDto
  ): Promise<void> {
    await this.supplierUsersService.update(supplierUser);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.supplierUsersService.delete(id);
  }
}
