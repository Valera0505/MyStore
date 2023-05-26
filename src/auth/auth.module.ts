import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '../typeorm/Token';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../typeorm/User';
import { Bucket } from '../typeorm/Bucket';
import { FavoriteList } from '../typeorm/FavoriteList';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token, User, Bucket, FavoriteList]),
    UsersModule,
    JwtModule.register({ global: true, secret: 'fff' }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
