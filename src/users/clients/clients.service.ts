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

  async findAllWithUser(): Promise<Client[]> {
    return await this.clientsRepository.find({
      relations: ['user'],
    });
  }

  async findAllWithUserAndReservations(): Promise<Client[]> {
    return await this.clientsRepository.find({
      relations: ['user', 'reservations'],
    });
  }

  async findById(id: number): Promise<Client> {
    return await this.clientsRepository.findOne(id);
  }

  async findByIdWithUser(id: number): Promise<Client> {
    return await this.clientsRepository.findOne(id, {
      relations: ['user'],
    });
  }

  async findByIdWithReservations(id: number): Promise<Client> {
    return await this.clientsRepository.findOne(id, {
      relations: ['reservations'],
    });
  }

  async findByIdWithUserAndReservations(id: number): Promise<Client> {
    return await this.clientsRepository.findOne(id, {
      relations: ['user', 'reservations'],
    });
  }

  async insert(newClient: Client): Promise<Client> {
    const storedClient = await this.findByIdWithUserAndReservations(
      newClient.id
    );
    if (!storedClient) return storedClient;
    try {
      await this.clientsRepository.insert(newClient);
    } catch (e) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return storedClient;
  }

  async update(updatedClient: Client): Promise<Client> {
    const client = this.clientsRepository.findOne(updatedClient.id);
    if (!client) return client;
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
    return client;
  }

  async updateReservations(updatedClient: Client): Promise<Client> {
    const client = this.clientsRepository.findOne(updatedClient.id);
    if (!client) return client;
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
    return client;
  }

  async deleteByIdWithUser(id: number): Promise<Client> {
    const client = await this.findByIdWithReservations(id);
    if (!client) return client;
    client.reservations = [];
    await this.clientsRepository.save(client);
    return client;
  }

  async deleteReservationById(id: number): Promise<Client> {
    const client = await this.findByIdWithReservations(id);
    if (!client) return client;
    client.reservations = client.reservations.filter(
      (reservation) => {
        reservation.id !== id;
      }
    );
    await this.clientsRepository.save(client);
    return client;
  }
}
