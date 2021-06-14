import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>
  ) {}

  async findAll(): Promise<Vehicle[]> {
    return await this.vehiclesRepository.find();
  }

  async findById(id: number): Promise<Vehicle> {
    return await this.vehiclesRepository.findOne(id);
  }

  async insert(newVehicle: Vehicle): Promise<void> {
    await this.vehiclesRepository.insert(newVehicle);
  }

  async update(updatedVehicle: Vehicle): Promise<void> {
    await this.vehiclesRepository.save(updatedVehicle);
  }

  async delete(id: number): Promise<void> {
    await this.vehiclesRepository.delete(id);
  }
}
