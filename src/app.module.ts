import { Module } from '@nestjs/common';
import { TravelsModule } from './travels/travels.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TravelsModule, CategoriesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
