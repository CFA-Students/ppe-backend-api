import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseUserDto } from './base-user.dto';
import { BaseUsersDto } from './base-users.dto';
import { BaseUser } from './base-user.entity';

@Injectable()
export class BaseUsersService {
  constructor(
    @InjectRepository(BaseUser)
    private baseUsersRepository: Repository<BaseUser>
  ) {}

  async findAll(): Promise<BaseUsersDto> {
    const allBaseUsers = await this.baseUsersRepository.find();
    return allBaseUsers;
  }

  async findById(id: number): Promise<BaseUserDto> {
    const record = await this.baseUsersRepository.findOne(id);

    if (record) {
      console.debug('find by id :', record);
      return record;
    }

    throw new HttpException('No user found', HttpStatus.NOT_FOUND);
  }

  async find(email: string): Promise<BaseUserDto> {
    const record = await this.baseUsersRepository.findOne({ email });
    console.log(email, record);

    if (record) {
      console.debug('find by email :', record);
      return record;
      // new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    throw new HttpException('No user found', HttpStatus.NOT_FOUND);
  }

  async insert(newBaseUser: BaseUserDto): Promise<void> {
    await this.baseUsersRepository.insert(newBaseUser);
  }

  async update(updatedBaseUser: BaseUserDto): Promise<void> {
    await this.baseUsersRepository.save(updatedBaseUser);
  }

  async delete(id: number): Promise<void> {
    await this.baseUsersRepository.delete(id);
  }
}
