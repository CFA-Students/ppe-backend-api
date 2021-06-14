import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocationCategoriesController } from './location-categories.controller';
import { LocationCategoriesService } from './location-categories.service';
import { LocationCategory } from './location-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationCategory])],
  controllers: [LocationCategoriesController],
  providers: [LocationCategoriesService],
  exports: [LocationCategoriesService],
})
export class LocationCategoriesModule {}
