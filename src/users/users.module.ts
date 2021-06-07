import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { ClientUsersController } from './client-users/client-users.controller';
import { AdminsController } from './admins/admins.controller';
import { SupplierUsersController } from './supplier-users/supplier-users.controller';

import { UsersService } from './users.service';
import { ClientUsersService } from './client-users/client-users.service';
import { AdminsService } from './admins/admins.service';
import { SupplierUsersService } from './supplier-users/supplier-users.service';

import { User } from './user.entity';
import { ClientUser } from './client-users/client-user.entity';
import { Admin } from './admins/admin.entity';
import { SupplierUser } from './supplier-users/supplier-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ClientUser, Admin, SupplierUser]),
  ],
  controllers: [
    UsersController,
    ClientUsersController,
    AdminsController,
    SupplierUsersController,
  ],
  providers: [
    UsersService,
    ClientUsersService,
    AdminsService,
    SupplierUsersService,
  ],
  exports: [
    UsersService,
    ClientUsersService,
    AdminsService,
    SupplierUsersService,
  ],
})
export class UsersModule {}
