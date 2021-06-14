import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    return await this.clientsRepository.findOne(id, {
      relations: ['user'],
    });
  }

  async insert(newClient: Client): Promise<void> {
    try {
      await this.clientsRepository.insert(newClient);
    } catch (e) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async update(updatedClient: Client): Promise<void> {
    await this.clientsRepository.save(updatedClient);
  }

  async delete(id: number): Promise<void> {
    await this.clientsRepository.delete(id);
  }
}
