import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { ClientUsersController } from './client-users/client-users.controller';
import { AdminUsersController } from './admins/admins.controller';
import { SupplierUsersController } from './supplier-users/supplier-users.controller';

import { UsersService } from './users.service';
import { ClientUsersService } from './client-users/client-users.service';
import { AdminUsersService } from './admins/admins.service';
import { SupplierUsersService } from './supplier-users/supplier-users.service';

import { User } from './user.entity';
import { ClientUser } from './client-users/client-user.entity';
import { AdminUser } from './admins/admin.entity';
import { SupplierUser } from './supplier-users/supplier-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      ClientUser,
      AdminUser,
      SupplierUser,
    ]),
  ],
  controllers: [
    UsersController,
    ClientUsersController,
    AdminUsersController,
    SupplierUsersController,
  ],
  providers: [
    UsersService,
    ClientUsersService,
    AdminUsersService,
    SupplierUsersService,
  ],
  exports: [
    UsersService,
    ClientUsersService,
    AdminUsersService,
    SupplierUsersService,
  ],
})
export class UsersModule {}
