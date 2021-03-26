import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoriesDto } from './categories.dto';
import { CategoryDto } from './category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ) {}

  async findAll(): Promise<CategoriesDto> {
    return await this.categoriesRepository.find();
  }

  async find(id: number): Promise<CategoryDto> {
    const record = await this.categoriesRepository.findOne(id);

    if (record) {
      return record;
    }

    throw new Error('No record found');
  }

  async insert(newTravel: CategoryDto): Promise<void> {
    await this.categoriesRepository.insert(newTravel);
  }

  async update(updatedTravel: CategoryDto): Promise<void> {
    await this.categoriesRepository.save(updatedTravel);
  }

  async delete(id: number): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
