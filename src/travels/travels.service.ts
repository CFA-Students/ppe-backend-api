import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TravelsDto } from './travels.dto';
import { TravelDto } from './travel.dto';
import { Travel } from './travels.entity';

@Injectable()
export class TravelsService {
  private readonly travels: TravelsDto = {
    1: {
      id: 1,
      createdAt: new Date('2021-03-10T21:38:33'),
      updatedAt: new Date('2021-03-10T21:38:33'),
      agency: 'Air Malaysia',
      destination: 'Voyage en Malaisie',
      priceHt: 1000.0,
      price: 1200.0,
      description: 'Voyage tah les fou',
      mainPhoto: 'Malaisie.jpg',
    },
    2: {
      id: 2,
      createdAt: new Date('2021-03-10T21:38:33'),
      updatedAt: new Date('2021-03-10T21:38:33'),
      agency: 'Air Thailand',
      destination: 'Voyage en Thaïlande',
      priceHt: 1000.0,
      price: 1200.0,
      description: 'Voyage tah les fou',
      mainPhoto: 'Thaïlande.jpg',
    },
  };

  constructor(
    @InjectRepository(Travel)
    private travelsRepository: Repository<Travel>
  ) {}

  async findAll(): Promise<TravelsDto> {
    return await this.travelsRepository.find();
  }

  async find(id: number): Promise<TravelDto> {
    const record = await this.travelsRepository.findOne(id);

    if (record) {
      return record;
    }

    throw new Error('No record found');
  }

  async insert(newTravel: TravelDto): Promise<void> {
    await this.travelsRepository.insert(newTravel);
  }

  async update(updatedTravel: TravelDto): Promise<void> {
    await this.travelsRepository.save(updatedTravel);

    // if (this.travels[updatedTravel.id]) {
    //   this.travels[updatedTravel.id] = updatedTravel;
    //   return;
    // }

    // throw new Error('No record found to update');
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
