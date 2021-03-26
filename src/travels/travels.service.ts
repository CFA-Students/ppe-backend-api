import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TravelsDto } from './travels.dto';
import { TravelDto } from './travel.dto';
import { Travel } from './travel.entity';

@Injectable()
export class TravelsService {
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
  }

  async delete(id: number): Promise<void> {
    await this.travelsRepository.delete(id);
  }
}
