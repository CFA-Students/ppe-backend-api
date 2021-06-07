import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { ClientsController } from './clients/clients.controller';
import { AdminsController } from './admins/admins.controller';
import { SupplierUsersController } from './supplier-users/supplier-users.controller';

import { UsersService } from './users.service';
import { ClientsService } from './clients/clients.service';
import { AdminsService } from './admins/admins.service';
import { SupplierUsersService } from './supplier-users/supplier-users.service';

import { User } from './user.entity';
import { Client } from './clients/client.entity';
import { Admin } from './admins/admin.entity';
import { SupplierUser } from './supplier-users/supplier-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Client, Admin, SupplierUser]),
  ],
  controllers: [
    UsersController,
    ClientsController,
    AdminsController,
    SupplierUsersController,
  ],
  providers: [
    UsersService,
    ClientsService,
    AdminsService,
    SupplierUsersService,
  ],
  exports: [
    UsersService,
    ClientsService,
    AdminsService,
    SupplierUsersService,
  ],
})
export class UsersModule {}
