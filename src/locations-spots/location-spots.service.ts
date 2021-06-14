import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LocationSpot } from './location-spot.entity';

@Injectable()
export class LocationSpotsService {
  constructor(
    @InjectRepository(LocationSpot)
    private locationSpotsRepository: Repository<LocationSpot>
  ) {}

  async findAll(): Promise<LocationSpot[]> {
    return await this.locationSpotsRepository.find();
  }

  async findById(id: number): Promise<LocationSpot> {
    return await this.locationSpotsRepository.findOne(id);
  }

  async insert(newLocationSpot: LocationSpot): Promise<void> {
    await this.locationSpotsRepository.insert(newLocationSpot);
  }

  async update(updatedLocationSpot: LocationSpot): Promise<void> {
    await this.locationSpotsRepository.save(updatedLocationSpot);
  }

  async delete(id: number): Promise<void> {
    await this.locationSpotsRepository.delete(id);
  }
}
