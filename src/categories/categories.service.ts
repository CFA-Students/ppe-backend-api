import { Injectable } from '@nestjs/common';
import { CategoriesDto } from './categories.dto';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoriesService {
  private readonly categories: CategoriesDto = {
    1: {
      id: 1,
      createdAt: '2021-03-10 21:38:33',
      updatedAt: '2021-03-10 21:38:33',
      name: 'Malaysia',
      isOnline: true,
    },
    2: {
      id: 2,
      createdAt: '2021-03-10 21:38:33',
      updatedAt: '2021-03-10 21:38:33',
      name: 'Thailand',
      isOnline: true,
    },
  };

  findAll(): CategoriesDto {
    return this.categories;
  }

  create(newCategory: CategoryDto): void {
    const id = new Date().valueOf();
    this.categories[id] = {
      ...newCategory,
      id,
    };
  }

  find(id: number): CategoryDto {
    const record: CategoryDto = this.categories[id];

    if (record) {
      return record;
    }

    throw new Error('No record found');
  }

  update(updatedCategory: CategoryDto): void {
    if (this.categories[updatedCategory.id]) {
      this.categories[updatedCategory.id] = updatedCategory;
      return;
    }

    throw new Error('No record found to update');
  }

  delete(id: number): void {
    const record: CategoryDto = this.categories[id];

    if (record) {
      delete this.categories[id];
      return;
    }

    throw new Error('No record found to delete');
  }
}
