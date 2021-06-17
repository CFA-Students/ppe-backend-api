import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/reservations/reservation.entity';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>
  ) {}

  async findAll(): Promise<Payment[]> {
    return await this.paymentsRepository.find();
  }

  async findAllWithReservations(): Promise<Payment[]> {
    return await this.paymentsRepository.find({
      relations: ['reservations'],
    });
  }

  async findById(id: number): Promise<Payment> {
    return await this.paymentsRepository.findOne(id);
  }

  async findByIdWithReservations(id: number): Promise<Payment> {
    return await this.paymentsRepository.findOne(id, {
      relations: ['reservations'],
    });
  }

  async insert(newPayment: Payment): Promise<void> {
    try {
      await this.paymentsRepository.save(newPayment);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY')
        throw new HttpException(
          'Duplicate reservation',
          HttpStatus.CONFLICT
        );
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async update(updatedPayment: Payment): Promise<Payment> {
    const payment = this.paymentsRepository.findOne(
      updatedPayment.id
    );
    if (!payment) return payment;
    try {
      await this.paymentsRepository.save(updatedPayment);
    } catch (e) {
      if (e.code === 'ER_NO_REFERENCED_ROW_2')
        throw new HttpException(
          'Duplicate foreign key',
          HttpStatus.CONFLICT
        );
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return payment;
  }

  async updateReservations(newPayment: Payment): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne(
      newPayment.id,
      {
        relations: ['reservations'],
      }
    );
    if (!payment) return undefined;

    try {
      if (payment.reservations.length <= 0) {
        payment.reservations = [...newPayment.reservations];
        await this.paymentsRepository.save(payment);
        return payment;
      }

      const newReservations: Reservation[] = [];
      payment.reservations = payment.reservations.map(
        (existingReservation, index) => {
          if (
            existingReservation.id ===
            newPayment.reservations[index].id
          ) {
            return newPayment.reservations[index];
          }
          return existingReservation;
        }
      );

      for (const newReservation of newPayment.reservations) {
        if (!payment.reservations.includes(newReservation)) {
          newReservations.push(newReservation);
        }
      }

      if (newReservations.length > 0) {
        payment.reservations = [
          ...payment.reservations,
          ...newReservations,
        ];
      }

      await this.paymentsRepository.save(payment);
      return payment;
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

  async deleteById(id: number): Promise<Payment> {
    const payment = await this.findByIdWithReservations(id);
    if (!payment) return payment;
    payment.reservations = [];
    await this.paymentsRepository.save(payment);
    await this.paymentsRepository.delete(payment.id);
    return payment;
  }

  async deleteReservationById(
    payment: Payment,
    idReservation: number
  ): Promise<void> {
    payment.reservations = payment.reservations.filter(
      (reservation) => reservation.id !== idReservation
    );
    await this.paymentsRepository.save(payment);
  }

  async deleteReservationsById(id: number): Promise<Payment> {
    const payment = await this.findByIdWithReservations(id);
    if (!payment) return payment;
    payment.reservations = payment.reservations.filter(
      (reservation) => {
        reservation.id !== id;
      }
    );
    await this.paymentsRepository.save(payment);
    return payment;
  }
}
