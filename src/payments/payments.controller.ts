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
import { ReservationsService } from 'src/reservations/reservations.service';
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

  @Get('reservations')
  async findAllWithReservations(): Promise<Payment[]> {
    const allPayments =
      await this.paymentsService.findAllWithReservations();
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
  async insert(@Body() payment: Payment): Promise<void> {
    await this.paymentsService.insert(payment);
  }

  @Put()
  @HttpCode(201)
  async update(@Body() newPayment: Payment): Promise<void> {
    const payment = await this.paymentsService.update(newPayment);
    this.testEntityExists(payment);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const payment = await this.paymentsService.deleteById(id);
    this.testEntityExists(payment);
  }

  @Get('reservations/:id')
  async findByIdWithReservations(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Payment> {
    const payment =
      await this.paymentsService.findByIdWithReservations(id);
    this.testEntityExists(payment);
    return payment;
  }

  @Put('reservations')
  @HttpCode(201)
  async updateReservations(
    @Body() newPayment: Payment
  ): Promise<void> {
    this.testReservationsExists(newPayment);

    const client = await this.paymentsService.updateReservations(
      newPayment
    );
    this.testEntityExists(client);
  }

  @Delete(':id/reservations')
  async deleteReservationsById(
    @Param('id') id: number
  ): Promise<void> {
    const payment = await this.paymentsService.deleteReservationsById(
      id
    );
    this.testEntityExists(payment);
  }

  @Delete(':id/reservations/:idReservation')
  async deleteReservationById(
    @Param('id', ParseIntPipe) id: number,
    @Param('idReservation', ParseIntPipe) idReservation: number
  ): Promise<void> {
    const payment =
      await this.paymentsService.findByIdWithReservations(id);
    this.testEntityExists(payment);
    this.testReservationsExists(payment);
    this.testReservationExists(payment, idReservation);

    await this.paymentsService.deleteReservationById(
      payment,
      idReservation
    );
  }

  private testReservationExists(
    payment: Payment,
    idReservation: number
  ) {
    for (const reservation of payment.reservations)
      if (reservation.id === idReservation) return undefined;
    throw new HttpException(
      'Bad request : no reservation with this id',
      HttpStatus.BAD_REQUEST
    );
  }

  private testReservationsExists(payment: Payment) {
    if (!payment.reservations || payment.reservations.length <= 0)
      throw new HttpException(
        'Bad request : no reservations[]',
        HttpStatus.BAD_REQUEST
      );
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
