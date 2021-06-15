import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reservation } from './reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>
  ) {}

  async findAll(): Promise<Reservation[]> {
    return await this.reservationsRepository.find();
  }

  async findAllWithClients(): Promise<Reservation[]> {
    return await this.reservationsRepository.find({
      relations: ['clients'],
    });
  }

  async findById(id: number): Promise<Reservation> {
    return await this.reservationsRepository.findOne(id);
  }

  async findByIdWithClients(id: number): Promise<Reservation> {
    return await this.reservationsRepository.findOne(id, {
      relations: ['clients'],
    });
  }

  async insert(newReservation: Reservation): Promise<void> {
    try {
      await this.reservationsRepository.save(newReservation);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY')
        throw new HttpException(
          'Duplicate reservation',
          HttpStatus.CONFLICT
        );
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async update(updatedReservation: Reservation): Promise<void> {
    try {
      await this.reservationsRepository.save(updatedReservation);
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
    const reservation = await this.findByIdWithClients(id);
    if (!reservation)
      throw new HttpException(
        'No reservation found',
        HttpStatus.NOT_FOUND
      );
    reservation.clients = reservation.clients.filter((client) => {
      client.id !== id;
    });
    await this.reservationsRepository.save(reservation);
    await this.deleteById(id);
  }

  async deleteById(id: number): Promise<void> {
    await this.reservationsRepository.delete(id);
  }
}
