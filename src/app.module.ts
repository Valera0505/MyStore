import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/User';
import { Product } from './typeorm/Product';
import { FavoriteList } from './typeorm/FavoriteList';
import { Token } from './typeorm/Token';
import { Category } from './typeorm/Category';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { Bucket } from './typeorm/Bucket';
import { BucketItem } from './typeorm/BucketItem';
import { FavoriteListItem } from './typeorm/FavoriteListItem';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Maratovna123',
      database: 'my-project-adina',
      entities: [
        User,
        Token,
        Product,
        FavoriteList,
        Category,
        Bucket,
        BucketItem,
        FavoriteListItem,
      ],
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    AdminsModule,
    AuthModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
