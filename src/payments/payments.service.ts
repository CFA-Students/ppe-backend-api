import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async delete(id: number): Promise<Payment> {
    const payment = await this.findById(id);
    if (!payment) return payment;
    payment.reservations = payment.reservations.filter(
      (reservation) => {
        reservation.id !== id;
      }
    );
    await this.paymentsRepository.save(payment);
    await this.deleteById(id);
    return payment;
  }

  async deleteById(id: number): Promise<void> {
    await this.paymentsRepository.delete(id);
  }
}
