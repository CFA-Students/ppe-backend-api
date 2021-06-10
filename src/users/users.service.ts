import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';

import { UserDto } from './user.dto';
import { User } from './user.entity';
import { isEmail } from 'class-validator';
import { ClientsService } from './clients/clients.service';

export enum UserType {
  Client,
  Admin,
  Supplier,
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private clientsRepository: ClientsService
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findById(id: number): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async find(username: string): Promise<User> {
    let record: User;
    if (isEmail(username)) {
      record = await this.usersRepository.findOne({
        where: {
          email: Equal(username),
        },
      });
    } else {
      record = await this.usersRepository.findOne({
        where: {
          username: Equal(username),
        },
      });
    }

    if (record) return record;

    throw new HttpException('No user found', HttpStatus.NOT_FOUND);
  }

  async findByEmail(email: string): Promise<User> {
    const record = await this.usersRepository.findOne({
      where: {
        email: Equal(email),
      },
    });

    if (record) return record;
    throw new HttpException('No user found', HttpStatus.NOT_FOUND);
  }

  async findByUsername(username: string): Promise<User> {
    const record = await this.usersRepository.findOne({
      where: {
        username: Equal(username),
      },
    });

    if (record) return record;
    throw new HttpException('No user found', HttpStatus.NOT_FOUND);
  }

  async findUserType(user: User) {
    const client = await this.clientsRepository.findById(user.id);
    if (client) return UserType.Client;
    // const client = this.clientsRepository.findById(user.id);
    // if (client) return UserType.Client;
    // const client = this.clientsRepository.findById(user.id);
    // if (client) return UserType.Client;

    throw new HttpException('INCORRECT TABLES', HttpStatus.NOT_FOUND);
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
