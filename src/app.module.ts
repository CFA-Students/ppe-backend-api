import { Module } from '@nestjs/common';
import { TravelsModule } from './travels/travels.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [TravelsModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
