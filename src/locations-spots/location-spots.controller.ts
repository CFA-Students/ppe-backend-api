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

import { LocationSpotsService } from './location-spots.service';
import { LocationSpot } from './location-spot.entity';
import { BaseEntity } from 'typeorm';

@Controller('location-spots')
export class LocationSpotsController {
  constructor(
    private readonly locationSpotsService: LocationSpotsService
  ) {}

  @Get()
  async findAll(): Promise<LocationSpot[]> {
    const allLocationSpots =
      await this.locationSpotsService.findAll();
    this.testEntitiesExists(allLocationSpots);
    return allLocationSpots;
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<LocationSpot> {
    const locationSpot = await this.locationSpotsService.findById(id);
    this.testEntityExists(locationSpot);
    return locationSpot;
  }

  @Post()
  @HttpCode(201)
  async insert(
    @Body('location-spot') locationSpot: LocationSpot
  ): Promise<void> {
    await this.locationSpotsService.insert(locationSpot);
  }

  @Put()
  async update(
    @Body('location-spot') locationSpot: LocationSpot
  ): Promise<void> {
    await this.locationSpotsService.update(locationSpot);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.locationSpotsService.delete(id);
  }

  private testEntitiesExists(entities: BaseEntity[]) {
    if (entities.length <= 0)
      throw new HttpException(
        'No location-spots found',
        HttpStatus.NOT_FOUND
      );
  }

  private testEntityExists(entity: BaseEntity) {
    if (!entity)
      throw new HttpException(
        'No location-spot found',
        HttpStatus.NOT_FOUND
      );
  }
}
