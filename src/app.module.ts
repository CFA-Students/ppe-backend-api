import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { AppController } from './app.controller';
import { ReservationModule } from './reservation/reservation.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocationModule } from './locations-spot/location.module';
import { LocationCategoryModule } from './location-category/location-category.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { VehicleCategoryModule } from './vehicle-category/vehicle-category.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    ReservationModule,
    LocationModule,
    LocationCategoryModule,
    VehicleModule,
    VehicleCategoryModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}
