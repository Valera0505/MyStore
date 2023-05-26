import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersBucketsService } from './users-buckets.service';
import { UsersFavoriteListService } from './users-favorite-lists.service';

@Controller('api/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private usersBucketsService: UsersBucketsService,
    private usersFavoriteListService: UsersFavoriteListService,
  ) {}
  @Get()
  async getUsers() {
    const users = await this.usersService.findUsers();
    return users;
  }

  @Get(':userId')
  async getUserById(@Param('userId', ParseIntPipe) userId: number) {
    const user = await this.usersService.findUserById(userId);
    return user;
  }

  @Get(':userId/bucket')
  async getBucketByUserId(@Param('userId', ParseIntPipe) userId: number) {
    const bucket = await this.usersBucketsService.findBucketByUserId(userId);
    return bucket;
  }

  @Get(':userId/favoriteList')
  async getfavoriteListByUserId(@Param('userId', ParseIntPipe) userId: number) {
    const favoriteList =
      await this.usersFavoriteListService.findFavoriteListByUserId(userId);
    return favoriteList;
  }

  @Get(':userId/bucket/products')
  async getBucketProducts(@Param('userId', ParseIntPipe) userId: number) {
    const products = await this.usersBucketsService.findBucketProducts(userId);
    return products;
  }

  @Get(':userId/favoriteList/products')
  async getFavoriteListProducts(@Param('userId', ParseIntPipe) userId: number) {
    const products =
      await this.usersFavoriteListService.findFavoriteListProducts(userId);
    return products;
  }
}
