import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LocationCategory } from './location-category.entity';

@Injectable()
export class LocationCategoriesService {
  constructor(
    @InjectRepository(LocationCategory)
    private locationCategoriesRepository: Repository<LocationCategory>
  ) {}

  async findAll(): Promise<LocationCategory[]> {
    return await this.locationCategoriesRepository.find();
  }

  async findById(id: number): Promise<LocationCategory> {
    return await this.locationCategoriesRepository.findOne(id);
  }

  async insert(newLocationCategory: LocationCategory): Promise<void> {
    await this.locationCategoriesRepository.insert(
      newLocationCategory
    );
  }

  async update(
    updatedLocationCategory: LocationCategory
  ): Promise<void> {
    await this.locationCategoriesRepository.save(
      updatedLocationCategory
    );
  }

  async delete(id: number): Promise<void> {
    await this.locationCategoriesRepository.delete(id);
  }
}
