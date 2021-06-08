import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { ClientsService } from './clients.service';
import { ClientDto } from './client.dto';
import { Client } from './client.entity';

@Controller('users/clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async findAll(): Promise<Client[]> {
    return await this.clientsService.findAll();
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number): Promise<Client> {
    return await this.clientsService.findById(id);
  }

  // @Get(':id')
  // async findByString(@Param('id') id: string): Promise<ClientDto> {
  //   return await this.clientsService.find(id);
  // }

  @Post()
  @HttpCode(201)
  async insert(@Body('user') client: ClientDto): Promise<void> {
    await this.clientsService.insert(client);
  }

  @Put()
  async update(@Body('user') client: ClientDto): Promise<void> {
    await this.clientsService.update(client);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.clientsService.delete(id);
  }
}
