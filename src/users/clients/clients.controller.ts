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
    if (!client)
      throw new HttpException(
        'No updatable client found',
        HttpStatus.NOT_FOUND
      );
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const client = await this.clientsService.deleteByIdWithUser(id);
    this.testClientExists(client);

    await this.usersService.delete(id);
  }

  @Get('reservations/:id')
  async findByIdWithUserAndReservations(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Client> {
    const client =
      await this.clientsService.findByIdWithUserAndReservations(id);
    this.testClientExists(client);
    return client;
  }

  @Post('reservations')
  @HttpCode(201)
  async insertWithReservations(
    @Body() client: Client
  ): Promise<void> {
    this.testReservationsExists(client);

    await this.clientsService.update(client);
  }

  @Put('reservations')
  @HttpCode(201)
  async updateReservations(@Body() newClient: Client): Promise<void> {
    this.testReservationsExists(newClient);

    const client = await this.clientsService.updateReservations(
      newClient
    );
    this.testClientExists(client);
  }

  @Delete(':id/reservations')
  async deleteReservationById(
    @Param('id') id: number
  ): Promise<void> {
    const client = await this.clientsService.deleteReservationById(
      id
    );
    this.testClientExists(client);
  }

  private testReservationsExists(client: Client) {
    if (!client.reservations || client.reservations.length <= 0)
      throw new HttpException(
        'Bad request : no reservations[]',
        HttpStatus.BAD_REQUEST
      );
  }

  private testClientExists(client: Client) {
    if (!client)
      throw new HttpException(
        'No client found',
        HttpStatus.NOT_FOUND
      );
  }
}
