import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Categories } from './categories';
import { CategoriesService } from './categories.service';
import { Category } from './category';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService
  ) {}

  @Get()
  async findAll(): Promise<Categories> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.find(id);
  }

  @Post()
  async create(@Body('category') category: Category): Promise<void> {
    this.categoriesService.create(category);
  }

  @Put()
  async update(@Body('category') category: Category): Promise<void> {
    this.categoriesService.update(category);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    this.categoriesService.delete(id);
  }
}
