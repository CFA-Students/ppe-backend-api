import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SupplierDto } from './supplier.dto';
import { SuppliersDto } from './suppliers.dto';
import { Supplier } from './supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>
  ) {}

  async findAll(): Promise<SuppliersDto> {
    return await this.suppliersRepository.find();
  }

  async findById(id: number): Promise<SupplierDto> {
    const record = await this.suppliersRepository.findOne(id);

    if (record) {
      console.debug('find by id :', record);
      return record;
    }

    throw new HttpException('No user found', HttpStatus.NOT_FOUND);
  }

  // async find(email: string): Promise<SupplierDto> {
  //   const record = await this.suppliersRepository.findOne({
  //     email,
  //   });
  //   console.log(email);

  //   if (record) {
  //     console.debug('find by email :', record);
  //     return record;
  //     // new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  //   }

  //   throw new HttpException('No user found', HttpStatus.NOT_FOUND);
  // }

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
