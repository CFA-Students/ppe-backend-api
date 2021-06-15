import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from './client.entity';
import { Reservation } from '../../reservations/reservation.entity';

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

  async findAllReservations(): Promise<Client[]> {
    return await this.clientsRepository.find({
      relations: ['user', 'reservations'],
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
      if (e.code === 'ER_NO_REFERENCED_ROW_2')
        throw new HttpException(
          'Duplicate foreign key',
          HttpStatus.CONFLICT
        );
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async update(updatedClient: Client): Promise<void> {
    try {
      await this.clientsRepository.save(updatedClient);
    } catch (e) {
      if (e.code === 'ER_NO_REFERENCED_ROW_2')
        throw new HttpException(
          'Duplicate foreign key',
          HttpStatus.CONFLICT
        );
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number): Promise<void> {
    await this.clientsRepository.delete(id);
  }
}
