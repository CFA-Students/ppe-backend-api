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
import { Supplier } from './supplier.entity';
import { UsersService } from '../users.service';
import { BaseEntity } from 'typeorm';

@Controller('users/suppliers')
export class SuppliersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly suppliersService: SuppliersService
  ) {}

  @Get()
  async findAll(): Promise<Supplier[]> {
    const allSuppliers = await this.suppliersService.findAll();
    this.testEntitiesExists(allSuppliers);
    return allSuppliers;
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Supplier> {
    const supplier = await this.suppliersService.findById(id);
    this.testEntityExists(supplier);
    return supplier;
  }

  @Post()
  @HttpCode(201)
  async insert(@Body() supplier: Supplier): Promise<void> {
    await this.usersService.insert(supplier.user);
    await this.suppliersService.insert(supplier);
  }

  @Put()
  async update(@Body() newSupplier: Supplier): Promise<void> {
    const supplier = await this.suppliersService.update(newSupplier);
    this.testEntityExists(supplier);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const supplier = await this.suppliersService.delete(id);
    this.testEntityExists(supplier);

    await this.usersService.delete(id);
  }

  private testEntitiesExists(entities: BaseEntity[]) {
    if (entities.length <= 0)
      throw new HttpException(
        'No admins found',
        HttpStatus.NOT_FOUND
      );
  }

  private testEntityExists(entity: BaseEntity) {
    if (!entity)
      throw new HttpException('No admin found', HttpStatus.NOT_FOUND);
  }
}
