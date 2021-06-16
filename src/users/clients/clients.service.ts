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

  async insert(newClient: Client): Promise<void> {
    try {
      await this.clientsRepository.insert(newClient);
    } catch (e) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
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

  async updateReservations(newClient: Client): Promise<Client> {
    const client = await this.clientsRepository.findOne(
      newClient.id,
      {
        relations: ['reservations'],
      }
    );
    if (!client) return undefined;

    try {
      if (client.reservations.length <= 0) {
        client.reservations = [...newClient.reservations];
        await this.clientsRepository.save(client);
        return client;
      }

      const newReservations: Reservation[] = [];
      client.reservations = client.reservations.map(
        (existingReservation, index) => {
          if (
            existingReservation.id ===
            newClient.reservations[index].id
          ) {
            return newClient.reservations[index];
          }
          return existingReservation;
        }
      );

      for (const newReservation of newClient.reservations) {
        if (!client.reservations.includes(newReservation)) {
          newReservations.push(newReservation);
        }
      }

      if (newReservations.length > 0) {
        client.reservations = [
          ...client.reservations,
          ...newReservations,
        ];
      }

      await this.clientsRepository.save(client);
      return client;
    } catch (e) {
      console.debug(e);
      if (e.code === 'ER_NO_REFERENCED_ROW_2')
        throw new HttpException(
          'Duplicate foreign key',
          HttpStatus.CONFLICT
        );
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteByIdWithUser(id: number): Promise<Client> {
    const client = await this.findByIdWithUserAndReservations(id);
    if (!client) return client;
    client.reservations = [];
    await this.clientsRepository.save(client);
    await this.clientsRepository.delete(client.id);
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
