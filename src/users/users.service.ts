import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';

import { User } from './user.entity';
import { isEmail } from 'class-validator';
import { ClientsService } from './clients/clients.service';
import { SuppliersService } from './suppliers/suppliers.service';
import { AdminsService } from './admins/admins.service';

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
    private clientsRepository: ClientsService,
    private adminsRepository: AdminsService,
    private suppliersRepository: SuppliersService
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
    const admin = this.adminsRepository.findById(user.id);
    if (admin) return UserType.Admin;
    const supplier = this.suppliersRepository.findById(user.id);
    if (supplier) return UserType.Supplier;

    throw new HttpException('INCORRECT TABLES', HttpStatus.NOT_FOUND);
  }

  async insert(newUser: User): Promise<void> {
    await this.usersRepository.insert(newUser);
  }

  async update(updatedUser: User): Promise<void> {
    await this.usersRepository.save(updatedUser);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
