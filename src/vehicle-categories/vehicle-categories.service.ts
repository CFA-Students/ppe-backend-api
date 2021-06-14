import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VehicleCategory } from './vehicle-category.entity';

@Injectable()
export class VehicleCategoriesService {
  constructor(
    @InjectRepository(VehicleCategory)
    private vehicleCategoriesRepository: Repository<VehicleCategory>
  ) {}

  async findAll(): Promise<VehicleCategory[]> {
    return await this.vehicleCategoriesRepository.find();
  }

  async findById(id: number): Promise<VehicleCategory> {
    return await this.vehicleCategoriesRepository.findOne(id);
  }

  async insert(newVehicleCategory: VehicleCategory): Promise<void> {
    await this.vehicleCategoriesRepository.insert(newVehicleCategory);
  }

  async update(
    updatedVehicleCategory: VehicleCategory
  ): Promise<void> {
    await this.vehicleCategoriesRepository.save(
      updatedVehicleCategory
    );
  }

  async delete(id: number): Promise<void> {
    await this.vehicleCategoriesRepository.delete(id);
  }
}
