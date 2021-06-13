import { Module } from '@nestjs/common';
import { LocationCategoryController } from './location-category.controller';
import { LocationCategoryService } from './location-category.service';

@Module({
  controllers: [LocationCategoryController],
  providers: [LocationCategoryService]
})
export class LocationCategoryModule {}
