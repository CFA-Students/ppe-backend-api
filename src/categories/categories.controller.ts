import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<CategoryDto> {
    return await this.categoriesService.find(id);
  }

  @Post()
  @HttpCode(201)
  async insert(
    @Body('category') category: CategoryDto
  ): Promise<void> {
    await this.categoriesService.insert(category);
  }

  @Put()
  async update(
    @Body('category') category: CategoryDto
  ): Promise<void> {
    await this.categoriesService.update(category);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.categoriesService.delete(id);
  }
}
