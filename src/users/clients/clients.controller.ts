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

import { ClientsService } from './clients.service';
import { Client } from './client.entity';
import { UsersService } from '../users.service';

@Controller('users/clients')
export class ClientsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly clientsService: ClientsService
  ) {}

  @Get()
  async findAllWithUser(): Promise<Client[]> {
    const allClients = await this.clientsService.findAllWithUser();
    if (allClients.length <= 0)
      throw new HttpException(
        'No clients found',
        HttpStatus.NOT_FOUND
      );
    return allClients;
  }

  @Get('reservations')
  async findAllWithUserAndReservations(): Promise<Client[]> {
    const allClients =
      await this.clientsService.findAllWithUserAndReservations();
    if (allClients.length <= 0)
      throw new HttpException(
        'No clients found',
        HttpStatus.NOT_FOUND
      );
    return allClients;
  }

  @Get(':id')
  async findByIdWithUser(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Client> {
    const client = await this.clientsService.findByIdWithUser(id);
    if (!client)
      throw new HttpException(
        'No client found',
        HttpStatus.NOT_FOUND
      );
    return client;
  }

  @Post()
  @HttpCode(201)
  async insert(@Body() client: Client): Promise<void> {
    await this.usersService.insert(client.user);
    await this.clientsService.insert(client);
  }

  @Put()
  async update(@Body() newClient: Client): Promise<void> {
    const client = await this.clientsService.update(newClient);
    this.testEntityExists(client);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const client = await this.clientsService.deleteByIdWithUser(id);
    this.testEntityExists(client);

    await this.usersService.delete(id);
  }

  @Get('reservations/:id')
  async findByIdWithUserAndReservations(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Client> {
    const client =
      await this.clientsService.findByIdWithUserAndReservations(id);
    this.testEntityExists(client);
    return client;
  }

  @Put('reservations')
  @HttpCode(201)
  async updateReservations(@Body() newClient: Client): Promise<void> {
    this.testReservationsExists(newClient);

    const client = await this.clientsService.updateReservations(
      newClient
    );
    this.testEntityExists(client);
  }

  @Delete(':id/reservations')
  async deleteReservationsById(
    @Param('id') id: number
  ): Promise<void> {
    const client = await this.clientsService.deleteReservationsById(
      id
    );
    this.testEntityExists(client);
  }

  @Delete(':id/reservations/:idReservation')
  async deleteReservationById(
    @Param('id', ParseIntPipe) id: number,
    @Param('idReservation', ParseIntPipe) idReservation: number
  ): Promise<void> {
    const client = await this.clientsService.findByIdWithReservations(
      id
    );
    this.testEntityExists(client);
    this.testReservationsExists(client);
    this.testReservationExists(client, idReservation);

    await this.clientsService.deleteReservationById(
      client,
      idReservation
    );
  }

  private testReservationExists(
    client: Client,
    idReservation: number
  ) {
    for (const reservation of client.reservations)
      if (reservation.id === idReservation) return undefined;
    throw new HttpException(
      'Bad request : no reservation with this id',
      HttpStatus.BAD_REQUEST
    );
  }

  private testReservationsExists(client: Client) {
    if (!client.reservations || client.reservations.length <= 0)
      throw new HttpException(
        'Bad request : no reservations[]',
        HttpStatus.BAD_REQUEST
      );
  }

  private testEntityExists(client: Client) {
    if (!client)
      throw new HttpException(
        'No client found',
        HttpStatus.NOT_FOUND
      );
  }
}
