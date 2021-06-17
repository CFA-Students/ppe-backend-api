import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async insert(newAdmin: Admin): Promise<void> {
    try {
      await this.adminsRepository.insert(newAdmin);
    } catch (e) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async update(updatedAdmin: Admin): Promise<Admin> {
    const admin = this.adminsRepository.findOne(updatedAdmin.id);
    if (!admin) return admin;
    try {
      await this.adminsRepository.save(updatedAdmin);
    } catch (e) {
      if (e.code === 'ER_NO_REFERENCED_ROW_2')
        throw new HttpException(
          'Duplicate foreign key',
          HttpStatus.CONFLICT
        );
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return admin;
  }

  async deleteWithUser(id: number): Promise<Admin> {
    const admin = await this.findById(id);
    if (!admin) return admin;
    await this.adminsRepository.delete(admin.id);
    return admin;
  }
}
