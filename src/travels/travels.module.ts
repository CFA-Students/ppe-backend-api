import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { TravelsService } from './travels.service';
import { TravelsController } from './travels.controller';
import { Travel } from './travels.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Travel])],
  providers: [TravelsService],
  controllers: [TravelsController],
})
export class TravelsModule {}
