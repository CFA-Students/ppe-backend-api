import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BaseUsersController } from './base-users/base-users.controller';
import { ClientUsersController } from './client-users/client-users.controller';
import { AdminUsersController } from './admin-users/admin-users.controller';
import { SupplierUsersController } from './supplier-users/supplier-users.controller';

import { BaseUsersService } from './base-users/base-users.service';
import { ClientUsersService } from './client-users/client-users.service';
import { AdminUsersService } from './admin-users/admin-users.service';
import { SupplierUsersService } from './supplier-users/supplier-users.service';

import { BaseUser } from './base-users/base-user.entity';
import { ClientUser } from './client-users/client-user.entity';
import { AdminUser } from './admin-users/admin-user.entity';
import { SupplierUser } from './supplier-users/supplier-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BaseUser,
      ClientUser,
      AdminUser,
      SupplierUser,
    ]),
  ],
  controllers: [
    BaseUsersController,
    ClientUsersController,
    AdminUsersController,
    SupplierUsersController,
  ],
  providers: [
    BaseUsersService,
    ClientUsersService,
    AdminUsersService,
    SupplierUsersService,
  ],
  exports: [
    BaseUsersService,
    ClientUsersService,
    AdminUsersService,
    SupplierUsersService,
  ],
})
export class UsersModule {}
