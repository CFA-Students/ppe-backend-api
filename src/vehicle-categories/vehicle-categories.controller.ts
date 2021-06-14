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

import { VehicleCategoriesService } from './vehicle-categories.service';
import { VehicleCategory } from 'src/vehicle-categories/vehicle-category.entity';

@Controller('vehicle-categories')
export class VehicleCategoriesController {
  constructor(
    private readonly vehicleCategoriesService: VehicleCategoriesService
  ) {}

  @Get()
  async findAll(): Promise<VehicleCategory[]> {
    const allVehicleCategories =
      await this.vehicleCategoriesService.findAll();
    if (allVehicleCategories.length <= 0)
      throw new HttpException(
        'No vehicle categories found',
        HttpStatus.NOT_FOUND
      );
    return allVehicleCategories;
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<VehicleCategory> {
    const vehicleCategory =
      await this.vehicleCategoriesService.findById(id);
    if (!vehicleCategory)
      throw new HttpException(
        'No vehicle category found',
        HttpStatus.NOT_FOUND
      );
    return vehicleCategory;
  }

  @Post()
  @HttpCode(201)
  async insert(
    @Body('vehicleCategory') vehicleCategory: VehicleCategory
  ): Promise<void> {
    await this.vehicleCategoriesService.insert(vehicleCategory);
  }

  @Put()
  async update(
    @Body('vehicleCategory') vehicleCategory: VehicleCategory
  ): Promise<void> {
    await this.vehicleCategoriesService.update(vehicleCategory);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.vehicleCategoriesService.delete(id);
  }
}
