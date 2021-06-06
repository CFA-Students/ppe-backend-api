import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SupplierUserDto } from './supplier-user.dto';
import { SupplierUsersDto } from './supplier-users.dto';
import { SupplierUser } from './supplier-user.entity';

@Injectable()
export class SupplierUsersService {
  constructor(
    @InjectRepository(SupplierUser)
    private supplierUsersRepository: Repository<SupplierUser>
  ) {}

  async findAll(): Promise<SupplierUsersDto> {
    return await this.supplierUsersRepository.find();
  }

  async findById(id: number): Promise<SupplierUserDto> {
    const record = await this.supplierUsersRepository.findOne(id);

    if (record) {
      console.debug('find by id :', record);
      return record;
    }

    throw new HttpException('No user found', HttpStatus.NOT_FOUND);
  }

  async find(email: string): Promise<SupplierUserDto> {
    const record = await this.supplierUsersRepository.findOne({
      email,
    });
    console.log(email);

    if (record) {
      console.debug('find by email :', record);
      return record;
      // new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    throw new HttpException('No user found', HttpStatus.NOT_FOUND);
  }

  async insert(newSupplierUser: SupplierUserDto): Promise<void> {
    await this.supplierUsersRepository.insert(newSupplierUser);
  }

  async update(updatedSupplierUser: SupplierUserDto): Promise<void> {
    await this.supplierUsersRepository.save(updatedSupplierUser);
  }

  async delete(id: number): Promise<void> {
    await this.supplierUsersRepository.delete(id);
  }
}
