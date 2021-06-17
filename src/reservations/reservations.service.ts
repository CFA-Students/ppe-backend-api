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

  async findAllWithClients(): Promise<Reservation[]> {
    return await this.reservationsRepository.find({
      relations: ['clients'],
    });
  }

  async findAllWithPayments(): Promise<Reservation[]> {
    return await this.reservationsRepository.find({
      relations: ['payments'],
    });
  }

  async findAllWithClientsAndPayments(): Promise<Reservation[]> {
    return await this.reservationsRepository.find({
      relations: ['clients', 'payments'],
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

  async findByIdWithPayments(id: number): Promise<Reservation> {
    return await this.reservationsRepository.findOne(id, {
      relations: ['payments'],
    });
  }

  async findByIdWithClientsAndPayments(
    id: number
  ): Promise<Reservation> {
    return await this.reservationsRepository.findOne(id, {
      relations: ['clients', 'payments'],
    });
  }

  async insert(newReservation: Reservation): Promise<Reservation> {
    return await this.reservationsRepository.save(newReservation);
  }

  async update(
    updatedReservation: Reservation
  ): Promise<Reservation> {
    return await this.reservationsRepository.save(updatedReservation);
  }

  async delete(id: number): Promise<Reservation> {
    const reservation = await this.findByIdWithClients(id);
    if (!reservation) return reservation;
    reservation.clients = reservation.clients.filter((client) => {
      client.id !== id;
    });
    await this.reservationsRepository.save(reservation);
    await this.deleteById(id);
    return reservation;
  }

  async deleteById(id: number): Promise<void> {
    await this.reservationsRepository.delete(id);
  }
}
