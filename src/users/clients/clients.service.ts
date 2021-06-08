import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClientDto } from './client.dto';
import { Client } from './client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>
  ) {}

  async findAll(): Promise<Client[]> {
    const allClients = await this.clientsRepository.find({
      relations: ['user'],
    });
    if (allClients.length <= 0)
      throw new HttpException(
        'No clients found',
        HttpStatus.NOT_FOUND
      );
    return allClients;
  }

  async findById(id: number): Promise<ClientDto> {
    const record = await this.clientsRepository.findOne(id);

    if (record) {
      console.debug('find by id :', record);
      return record;
    }

    throw new HttpException('No user found', HttpStatus.NOT_FOUND);
  }

  // async find(email: string): Promise<ClientDto> {
  //   const record = await this.clientsRepository.findOne({
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

  async insert(newClient: ClientDto): Promise<void> {
    await this.clientsRepository.insert(newClient);
  }

  async update(updatedClient: ClientDto): Promise<void> {
    await this.clientsRepository.save(updatedClient);
  }

  async delete(id: number): Promise<void> {
    await this.clientsRepository.delete(id);
  }
}
