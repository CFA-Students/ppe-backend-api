import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocationSpotsController } from './location-spots.controller';
import { LocationSpotsService } from './location-spots.service';
import { LocationSpot } from './location-spot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationSpot])],
  controllers: [LocationSpotsController],
  providers: [LocationSpotsService],
  exports: [LocationSpotsService],
})
export class LocationSpotsModule {}
