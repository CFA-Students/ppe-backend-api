import { Injectable } from '@nestjs/common';
import { Categories } from './categories';
import { Category } from './category';

@Injectable()
export class CategoriesService {
  private readonly categories: Categories = {
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

  findAll(): Categories {
    return this.categories;
  }

  create(newCategory: Category): void {
    const id = new Date().valueOf();
    this.categories[id] = {
      ...newCategory,
      id,
    };
  }

  find(id: number): Category {
    const record: Category = this.categories[id];

    if (record) {
      return record;
    }

    throw new Error('No record found');
  }

  update(updatedCategory: Category): void {
    if (this.categories[updatedCategory.id]) {
      this.categories[updatedCategory.id] = updatedCategory;
      return;
    }

    throw new Error('No record found to update');
  }

  delete(id: number): void {
    const record: Category = this.categories[id];

    if (record) {
      delete this.categories[id];
      return;
    }

    throw new Error('No record found to delete');
  }
}
