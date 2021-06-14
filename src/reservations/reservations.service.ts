import { Injectable } from '@nestjs/common';
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

  async findById(id: number): Promise<Reservation> {
    return await this.reservationsRepository.findOne(id);
  }

  async insert(newreservation: Reservation): Promise<void> {
    await this.reservationsRepository.insert(newreservation);
  }

  async update(updatedreservation: Reservation): Promise<void> {
    await this.reservationsRepository.save(updatedreservation);
  }

  async delete(id: number): Promise<void> {
    await this.reservationsRepository.delete(id);
  }
}
