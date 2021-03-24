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
import { Travels } from './travels';
import { Travel } from './travel';

@Controller('travels')
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @Get()
  async findAll(): Promise<Travels> {
    return this.travelsService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Travel> {
    return this.travelsService.find(id);
  }

  @Post()
  async create(@Body('travel') travel: Travel): Promise<void> {
    this.travelsService.create(travel);
  }

  @Put()
  async update(@Body('travel') travel: Travel): Promise<void> {
    this.travelsService.update(travel);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    this.travelsService.delete(id);
  }
}
