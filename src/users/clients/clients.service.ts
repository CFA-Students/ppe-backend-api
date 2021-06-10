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
    return await this.clientsRepository.find({
      relations: ['user'],
    });
  }

  async findById(id: number): Promise<Client> {
    const record = await this.clientsRepository.findOne(id, {
      relations: ['user'],
    });

    if (record) return record;

    throw new HttpException('No user found', HttpStatus.NOT_FOUND);
  }

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
