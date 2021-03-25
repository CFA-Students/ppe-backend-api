import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CategoriesDto } from './categories.dto';
import { CategoryDto } from './category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService
  ) {}

  @Get()
  async findAll(): Promise<CategoriesDto> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<CategoryDto> {
    return this.categoriesService.find(id);
  }

  @Post()
  async create(
    @Body('category') category: CategoryDto
  ): Promise<void> {
    this.categoriesService.create(category);
  }

  @Put()
  async update(
    @Body('category') category: CategoryDto
  ): Promise<void> {
    this.categoriesService.update(category);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    this.categoriesService.delete(id);
  }
}
