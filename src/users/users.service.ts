import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDto } from './user.dto';
import { UsersDto } from './users.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findAll(): Promise<UsersDto> {
    return await this.usersRepository.find();
  }

  async find(id: number): Promise<UserDto> {
    const record = await this.usersRepository.findOne(id);

    if (record) {
      return record;
    }

    throw new Error('No record found');
  }

  async insert(newUser: UserDto): Promise<void> {
    await this.usersRepository.insert(newUser);
  }

  async update(updatedUser: UserDto): Promise<void> {
    await this.usersRepository.save(updatedUser);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
