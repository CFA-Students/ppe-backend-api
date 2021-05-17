import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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

  async findById(id: number): Promise<UserDto> {
    const record = await this.usersRepository.findOne(id);

    if (record) {
      console.debug('find by id :', record);
      return record;
    }

    throw new HttpException('No user found', HttpStatus.NOT_FOUND);
  }

  async find(email: string): Promise<UserDto> {
    const record = await this.usersRepository.findOne({ email });
    console.log(email);

    if (record) {
      console.debug('find by email :', record);
      return record;
      // new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    throw new HttpException('No user found', HttpStatus.NOT_FOUND);
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
