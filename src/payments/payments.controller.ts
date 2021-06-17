import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BaseEntity } from 'typeorm';
import { Payment } from './payment.entity';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  async findAll(): Promise<Payment[]> {
    const allPayments = await this.paymentsService.findAll();
    this.testEntitiesExists(allPayments);
    return allPayments;
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Payment> {
    const payment = await this.paymentsService.findById(id);
    this.testEntityExists(payment);
    return payment;
  }

  @Post()
  @HttpCode(201)
  async insert(@Body('payment') payment: Payment): Promise<void> {
    await this.paymentsService.insert(payment);
  }

  @Put()
  async update(@Body('payment') payment: Payment): Promise<void> {
    await this.paymentsService.update(payment);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.paymentsService.delete(id);
  }

  private testEntitiesExists(entities: BaseEntity[]) {
    if (entities.length <= 0)
      throw new HttpException(
        'No payments found',
        HttpStatus.NOT_FOUND
      );
  }

  private testEntityExists(entity: BaseEntity) {
    if (!entity)
      throw new HttpException(
        'No payment found',
        HttpStatus.NOT_FOUND
      );
  }
}
