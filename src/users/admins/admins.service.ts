import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdminDto } from './admin.dto';
import { Admin } from './admin.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>
  ) {}

  async findAll(): Promise<Admin[]> {
    return await this.adminsRepository.find({
      relations: ['user'],
    });
  }

  async findById(id: number): Promise<Admin> {
    return await this.adminsRepository.findOne(id, {
      relations: ['user'],
    });
  }

  async insert(newAdmin: AdminDto): Promise<void> {
    await this.adminsRepository.insert(newAdmin);
  }

  async update(updatedAdmin: AdminDto): Promise<void> {
    await this.adminsRepository.save(updatedAdmin);
  }

  async delete(id: number): Promise<void> {
    await this.adminsRepository.delete(id);
  }
}
