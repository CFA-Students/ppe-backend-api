import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdminUserDto } from './admin.dto';
import { AdminUsersDto } from './admins.dto';
import { AdminUser } from './admin.entity';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUsersRepository: Repository<AdminUser>
  ) {}

  // async findAll(): Promise<AdminUsersDto> {
  //   return await this.adminUsersRepository.find();
  // }

  async findById(id: number): Promise<AdminUserDto> {
    const record = await this.adminUsersRepository.findOne(id);

    if (record) {
      console.debug('find by id :', record);
      return record;
    }

    throw new HttpException('No user found', HttpStatus.NOT_FOUND);
  }

  // async find(email: string): Promise<AdminUserDto> {
  //   const record = await this.adminUsersRepository.findOne({ email });
  //   console.log(email);

  //   if (record) {
  //     console.debug('find by email :', record);
  //     return record;
  //     // new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  //   }

  //   throw new HttpException('No user found', HttpStatus.NOT_FOUND);
  // }

  async insert(newAdminUser: AdminUserDto): Promise<void> {
    await this.adminUsersRepository.insert(newAdminUser);
  }

  async update(updatedAdminUser: AdminUserDto): Promise<void> {
    await this.adminUsersRepository.save(updatedAdminUser);
  }

  async delete(id: number): Promise<void> {
    await this.adminUsersRepository.delete(id);
  }
}
