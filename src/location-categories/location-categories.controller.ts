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

import { LocationCategoriesService } from './location-categories.service';
import { LocationCategory } from './location-category.entity';

@Controller('location-category')
export class LocationCategoriesController {
  constructor(
    private readonly locationCategoriesService: LocationCategoriesService
  ) {}

  @Get()
  async findAll(): Promise<LocationCategory[]> {
    const allLocationCategorys =
      await this.locationCategoriesService.findAll();
    if (allLocationCategorys.length <= 0)
      throw new HttpException(
        'No location categoriess found',
        HttpStatus.NOT_FOUND
      );
    return allLocationCategorys;
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<LocationCategory> {
    const locationCategory =
      await this.locationCategoriesService.findById(id);
    if (!locationCategory)
      throw new HttpException(
        'No location category found',
        HttpStatus.NOT_FOUND
      );
    return locationCategory;
  }

  @Post()
  @HttpCode(201)
  async insert(@Body('user') user: LocationCategory): Promise<void> {
    await this.locationCategoriesService.insert(user);
  }

  @Put()
  async update(@Body('user') user: LocationCategory): Promise<void> {
    await this.locationCategoriesService.update(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.locationCategoriesService.delete(id);
  }
}
