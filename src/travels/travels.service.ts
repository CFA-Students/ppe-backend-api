import { Injectable } from '@nestjs/common';
import { Travels } from './travels';
import { Travel } from './travel';

@Injectable()
export class TravelsService {
  private readonly travels: Travels = {
    1: {
      id: 1,
      cratedAt: '2021-03-10 21:38:33',
      updatedAt: '2021-03-10 21:38:33',
      agency: 'Air Malaysia',
      destination: 'Voyage en Malaisie',
      priceHt: 1000.0,
      price: 1200.0,
      description: 'Voyage tah les fou',
      image: 'Malaisie.jpg',
    },
    2: {
      id: 2,
      cratedAt: '2021-03-10 21:38:33',
      updatedAt: '2021-03-10 21:38:33',
      agency: 'Air Thailand',
      destination: 'Voyage en Thaïlande',
      priceHt: 1000.0,
      price: 1200.0,
      description: 'Voyage tah les fou',
      image: 'Thaïlande.jpg',
    },
  };

  findAll(): Travels {
    return this.travels;
  }

  create(newItem: Travel): void {
    const id = new Date().valueOf();
    this.travels[id] = {
      ...newItem,
      id,
    };
  }

  find(id: number): Travel {
    const record: Travel = this.travels[id];

    if (record) {
      return record;
    }

    throw new Error('No record found');
  }

  update(updatedItem: Travel): void {
    if (this.travels[updatedItem.id]) {
      this.travels[updatedItem.id] = updatedItem;
      return;
    }

    throw new Error('No record found to update');
  }

  delete(id: number): void {
    const record: Travel = this.travels[id];

    if (record) {
      delete this.travels[id];
      return;
    }

    throw new Error('No record found to delete');
  }
}
