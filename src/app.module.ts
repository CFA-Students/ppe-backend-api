import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { ReservationModule } from './reservation/reservation.module';
import { LocationSpotModule } from './locations-spots/location-spots.module';
import { LocationCategoryModule } from './location-categories/location-categories.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { VehicleCategoryModule } from './vehicle-category/vehicle-category.module';
import { PaymentModule } from './payment/payment.module';

import { AppController } from './app.controller';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    ReservationModule,
    LocationSpotModule,
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
