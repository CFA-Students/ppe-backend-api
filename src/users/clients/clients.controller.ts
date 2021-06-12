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

@Controller('users/clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async findAll(): Promise<Client[]> {
    const allClients = await this.clientsService.findAll();
    if (allClients.length <= 0)
      throw new HttpException(
        'No clients found',
        HttpStatus.NOT_FOUND
      );
    return allClients;
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number): Promise<Client> {
    const client = await this.clientsService.findById(id);
    if (!client)
      throw new HttpException(
        'No client found',
        HttpStatus.NOT_FOUND
      );
    return client;
  }

  @Post()
  @HttpCode(201)
  async insert(@Body('user') client: Client): Promise<void> {
    await this.clientsService.insert(client);
  }

  @Put()
  async update(@Body('user') client: Client): Promise<void> {
    await this.clientsService.update(client);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.clientsService.delete(id);
  }
}
