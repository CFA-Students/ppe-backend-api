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

import { SuppliersService } from './suppliers.service';
import { SuppliersDto } from './suppliers.dto';
import { SupplierDto } from './supplier.dto';

@Controller('users/suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  // @Get()
  // async findAll(): Promise<SuppliersDto> {
  //   return await this.suppliersService.findAll();
  // }

  @Get(':id')
  async find(@Param('id') id: number | string): Promise<SupplierDto> {
    if (typeof id === 'number')
      return await this.suppliersService.findById(id);
    // else if (typeof id === 'string')
    //   return await this.suppliersService.find(id);
    else throw new BadRequestException();
  }

  @Post()
  @HttpCode(201)
  async insert(@Body('user') supplier: SupplierDto): Promise<void> {
    await this.suppliersService.insert(supplier);
  }

  @Put()
  async update(@Body('user') supplier: SupplierDto): Promise<void> {
    await this.suppliersService.update(supplier);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.suppliersService.delete(id);
  }
}
