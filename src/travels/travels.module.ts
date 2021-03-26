import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TravelsService } from './travels.service';
import { TravelsController } from './travels.controller';
import { Travel } from './travel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Travel])],
  providers: [TravelsService],
  controllers: [TravelsController],
})
export class TravelsModule {}
