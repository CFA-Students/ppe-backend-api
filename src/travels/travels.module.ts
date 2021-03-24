import { Module } from '@nestjs/common';
import { TravelsService } from './travels.service';

@Module({
  providers: [TravelsService],
})
export class TravelsModule {}
