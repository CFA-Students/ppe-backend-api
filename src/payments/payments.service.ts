import { Injectable } from '@nestjs/common';
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

  async findById(id: number): Promise<Payment> {
    return await this.paymentsRepository.findOne(id);
  }

  async insert(newPayment: Payment): Promise<Payment> {
    return await this.paymentsRepository.save(newPayment);
  }

  async update(updatedPayment: Payment): Promise<Payment> {
    return await this.paymentsRepository.save(updatedPayment);
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
