import { Module } from '@nestjs/common';
import { VehicleCategoryController } from './vehicle-category.controller';
import { VehicleCategoryService } from './vehicle-category.service';

@Module({
  controllers: [VehicleCategoryController],
  providers: [VehicleCategoryService]
})
export class VehicleCategoryModule {}
