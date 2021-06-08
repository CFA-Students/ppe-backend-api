import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { ClientsController } from './clients/clients.controller';
// import { AdminsController } from './admins/admins.controller';
// import { SuppliersController } from './suppliers/suppliers.controller';

import { UsersService } from './users.service';
import { ClientsService } from './clients/clients.service';
// import { AdminsService } from './admins/admins.service';
// import { SuppliersService } from './suppliers/suppliers.service';

import { User } from './user.entity';
import { Client } from './clients/client.entity';
// import { Admin } from './admins/admin.entity';
// import { Supplier } from './suppliers/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Client])],
  controllers: [
    UsersController,
    ClientsController,
    // AdminsController,
    // SuppliersController,
  ],
  providers: [
    UsersService,
    ClientsService,
    // AdminsService,
    // SuppliersService,
  ],
  exports: [
    UsersService,
    ClientsService,
    // AdminsService,
    // SuppliersService,
  ],
})
export class UsersModule {}
