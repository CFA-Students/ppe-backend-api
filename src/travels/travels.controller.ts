import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { TravelsService } from './travels.service';
import { TravelsDto } from './travels.dto';
import { TravelDto } from './travel.dto';

@Controller('travels')
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @Get()
  async findAll(): Promise<TravelsDto> {
    return this.travelsService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<TravelDto> {
    return await this.travelsService.find(id);
  }

  @Post()
  async create(@Body('travel') travel: TravelDto): Promise<void> {
    this.travelsService.create(travel);
  }

  @Put()
  async update(@Body('travel') travel: TravelDto): Promise<void> {
    this.travelsService.update(travel);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    this.travelsService.delete(id);
  }
}
