import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClientUserDto } from './client-user.dto';
import { ClientUsersDto } from './client-users.dto';
import { ClientUser } from './client-user.entity';

@Injectable()
export class ClientUsersService {
  constructor(
    @InjectRepository(ClientUser)
    private clientUsersRepository: Repository<ClientUser>
  ) {}

  async findAll(): Promise<ClientUsersDto> {
    return await this.clientUsersRepository.find();
  }

  async findById(id: number): Promise<ClientUserDto> {
    const record = await this.clientUsersRepository.findOne(id);

    if (record) {
      console.debug('find by id :', record);
      return record;
    }

    throw new HttpException('No user found', HttpStatus.NOT_FOUND);
  }

  async find(email: string): Promise<ClientUserDto> {
    const record = await this.clientUsersRepository.findOne({
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

  async insert(newClientUser: ClientUserDto): Promise<void> {
    await this.clientUsersRepository.insert(newClientUser);
  }

  async update(updatedClientUser: ClientUserDto): Promise<void> {
    await this.clientUsersRepository.save(updatedClientUser);
  }

  async delete(id: number): Promise<void> {
    await this.clientUsersRepository.delete(id);
  }
}
