import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../typeorm/Product';
import { CategoriesModule } from '../categories/categories.module';
import { Category } from '../typeorm/Category';
import { UsersModule } from '../users/users.module';
import { BucketItem } from '../typeorm/BucketItem';
import { Bucket } from '../typeorm/Bucket';
import { FavoriteListItem } from '../typeorm/FavoriteListItem';
import { FavoriteList } from '../typeorm/FavoriteList';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Category,
      BucketItem,
      Bucket,
      FavoriteListItem,
      FavoriteList,
    ]),
    CategoriesModule,
    UsersModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
