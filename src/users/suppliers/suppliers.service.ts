import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SupplierDto } from './supplier.dto';
import { Supplier } from './supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>
  ) {}

  async findAll(): Promise<Supplier[]> {
    return await this.suppliersRepository.find({
      relations: ['user'],
    });
  }

  async findById(id: number): Promise<Supplier> {
    return await this.suppliersRepository.findOne(id, {
      relations: ['user'],
    });
  }

  async insert(newSupplier: SupplierDto): Promise<void> {
    await this.suppliersRepository.insert(newSupplier);
  }

  async update(updatedSupplier: SupplierDto): Promise<void> {
    await this.suppliersRepository.save(updatedSupplier);
  }

  async delete(id: number): Promise<void> {
    await this.suppliersRepository.delete(id);
  }
}
