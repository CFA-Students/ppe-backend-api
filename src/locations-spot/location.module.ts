import { Module } from '@nestjs/common';
import { LocationSpotController } from './location-spot.controller';
import { LocationSpotService } from './location-spot.service';

@Module({
  controllers: [LocationSpotController],
  providers: [LocationSpotService],
})
export class LocationModule {}
