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

  async insert(newPayment: Payment): Promise<void> {
    await this.paymentsRepository.insert(newPayment);
  }

  async update(updatedPayment: Payment): Promise<void> {
    await this.paymentsRepository.save(updatedPayment);
  }

  async delete(id: number): Promise<void> {
    await this.paymentsRepository.delete(id);
  }
}
