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

import { Vehicle } from './vehicle.entity';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  async findAll(): Promise<Vehicle[]> {
    const allVehicles = await this.vehiclesService.findAll();
    if (allVehicles.length <= 0)
      throw new HttpException(
        'No vehicles found',
        HttpStatus.NOT_FOUND
      );
    return allVehicles;
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Vehicle> {
    const vehicle = await this.vehiclesService.findById(id);
    if (!vehicle)
      throw new HttpException(
        'No vehicle found',
        HttpStatus.NOT_FOUND
      );
    return vehicle;
  }

  @Post()
  @HttpCode(201)
  async insert(@Body('vehicle') vehicle: Vehicle): Promise<void> {
    await this.vehiclesService.insert(vehicle);
  }

  @Put()
  async update(@Body('vehicle') vehicle: Vehicle): Promise<void> {
    await this.vehiclesService.update(vehicle);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.vehiclesService.delete(id);
  }
}
