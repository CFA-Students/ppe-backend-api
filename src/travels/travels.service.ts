import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TravelsDto } from './travels.dto';
import { TravelDto } from './travel.dto';
import { Travel } from './travels.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TravelsService {
  private readonly travels: TravelsDto = {
    1: {
      id: 1,
      createdAt: '2021-03-10 21:38:33',
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
      createdAt: '2021-03-10 21:38:33',
      updatedAt: '2021-03-10 21:38:33',
      agency: 'Air Thailand',
      destination: 'Voyage en Thaïlande',
      priceHt: 1000.0,
      price: 1200.0,
      description: 'Voyage tah les fou',
      image: 'Thaïlande.jpg',
    },
  };

  constructor(
    @InjectRepository(Travel)
    private travelsRepository: Repository<Travel>
  ) {}

  async findAll(): Promise<TravelsDto> {
    return await this.travelsRepository.find();
  }

  create(newTravel: TravelDto): void {
    const id = new Date().valueOf();
    this.travels[id] = {
      ...newTravel,
      id,
    };
  }

  find(id: number): TravelDto {
    const record: TravelDto = this.travels[id];

    if (record) {
      return record;
    }

    throw new Error('No record found');
  }

  update(updatedTravel: TravelDto): void {
    if (this.travels[updatedTravel.id]) {
      this.travels[updatedTravel.id] = updatedTravel;
      return;
    }

    throw new Error('No record found to update');
  }

  delete(id: number): void {
    const record: TravelDto = this.travels[id];

    if (record) {
      delete this.travels[id];
      return;
    }

    throw new Error('No record found to delete');
  }
}
