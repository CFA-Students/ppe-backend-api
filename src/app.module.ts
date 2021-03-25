import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TravelsModule } from './travels/travels.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TravelsModule,
    CategoriesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
