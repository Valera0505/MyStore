import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersBucketsService } from './users-buckets.service';
import { UsersFavoriteListService } from './users-favorite-lists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/User';
import { Token } from '../typeorm/Token';
import { Bucket } from '../typeorm/Bucket';
import { FavoriteList } from '../typeorm/FavoriteList';
import { BucketItem } from '../typeorm/BucketItem';
import { FavoriteListItem } from '../typeorm/FavoriteListItem';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Token,
      Bucket,
      FavoriteList,
      BucketItem,
      FavoriteListItem,
    ]),
  ],
  exports: [UsersService, UsersBucketsService, UsersFavoriteListService],
  controllers: [UsersController],
  providers: [UsersService, UsersBucketsService, UsersFavoriteListService],
})
export class UsersModule {}
