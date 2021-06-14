import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleCategoriesController } from './vehicle-categories.controller';
import { VehicleCategoriesService } from './vehicle-categories.service';
import { VehicleCategory } from './vehicle-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleCategory])],
  controllers: [VehicleCategoriesController],
  providers: [VehicleCategoriesService],
  exports: [VehicleCategoriesService],
})
export class VehicleCategoriesModule {}
