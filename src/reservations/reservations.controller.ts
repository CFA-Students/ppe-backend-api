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

import { ReservationsService } from './reservations.service';
import { Reservation } from './reservation.entity';
import { ClientsService } from '../users/clients/clients.service';
import { Client } from '../users/clients/client.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly reservationsService: ReservationsService
  ) {}

  @Get()
  async findAll(): Promise<Reservation[]> {
    const allReservations = await this.reservationsService.findAll();
    if (allReservations.length <= 0)
      throw new HttpException(
        'No reservations found',
        HttpStatus.NOT_FOUND
      );
    return allReservations;
  }

  @Get('clients')
  async findAllWithClients(): Promise<Reservation[]> {
    const allReservations =
      await this.reservationsService.findAllWithClients();
    if (allReservations.length <= 0)
      throw new HttpException(
        'No reservations found',
        HttpStatus.NOT_FOUND
      );
    return allReservations;
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Reservation> {
    const reservation = await this.reservationsService.findById(id);
    if (!reservation)
      throw new HttpException(
        'No reservation found',
        HttpStatus.NOT_FOUND
      );
    return reservation;
  }

  @Get('clients/:id')
  async findByIdWithClients(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Reservation> {
    const reservation =
      await this.reservationsService.findByIdWithClients(id);
    if (!reservation)
      throw new HttpException(
        'No reservation found',
        HttpStatus.NOT_FOUND
      );
    return reservation;
  }

  @Post()
  @HttpCode(201)
  async insert(@Body() reservation: Reservation): Promise<void> {
    await this.reservationsService.insert(reservation);
  }

  @Put()
  async update(@Body() reservation: Reservation): Promise<void> {
    await this.reservationsService.update(reservation);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.reservationsService.delete(id);
  }
}
