import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ClientUsersService } from './client-users.service';
import { ClientUsersDto } from './client-users.dto';
import { ClientUserDto } from './client-user.dto';

@Controller('users/clients')
export class ClientUsersController {
  constructor(
    private readonly clientUsersService: ClientUsersService
  ) {}

  // @Get()
  // async findAll(): Promise<ClientUsersDto> {
  //   return await this.clientUsersService.findAll();
  // }

  @Get(':id')
  async find(
    @Param('id') id: number | string
  ): Promise<ClientUserDto> {
    if (typeof id === 'number')
      return await this.clientUsersService.findById(id);
    // else if (typeof id === 'string')
    //   return await this.clientUsersService.find(id);
    else throw new BadRequestException();
  }

  @Post()
  @HttpCode(201)
  async insert(
    @Body('user') clientUser: ClientUserDto
  ): Promise<void> {
    await this.clientUsersService.insert(clientUser);
  }

  @Put()
  async update(
    @Body('user') clientUser: ClientUserDto
  ): Promise<void> {
    await this.clientUsersService.update(clientUser);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.clientUsersService.delete(id);
  }
}
