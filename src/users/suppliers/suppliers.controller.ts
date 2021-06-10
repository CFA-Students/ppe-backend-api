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

import { SuppliersService } from './suppliers.service';
import { SuppliersDto } from './suppliers.dto';
import { SupplierDto } from './supplier.dto';
import { Supplier } from './supplier.entity';

@Controller('users/suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  async findAll(): Promise<Supplier[]> {
    const allSuppliers = await this.suppliersService.findAll();
    if (allSuppliers.length <= 0) {
      throw new HttpException(
        'No admins found',
        HttpStatus.NOT_FOUND
      );
    }
    return allSuppliers;
  }

  @Get(':id')
  async find(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Supplier> {
    const supplier = await this.suppliersService.findById(id);
    if (!supplier)
      throw new HttpException(
        'No client found',
        HttpStatus.NOT_FOUND
      );
    return supplier;
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
