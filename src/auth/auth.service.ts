import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm/User';
import { Repository } from 'typeorm';
import { Token } from '../typeorm/Token';
import { RegisterUserParams, SignInUserParams } from '../utils/types';
import { comparePasswords, encodePassword } from '../utils/bcrypt';
import { UsersBucketsService } from '../users/users-buckets.service';
import { Bucket } from '../typeorm/Bucket';
import { FavoriteList } from '../typeorm/FavoriteList';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    @InjectRepository(Bucket)
    private bucketRepository: Repository<Bucket>,
    @InjectRepository(FavoriteList)
    private favoriteListRepository: Repository<FavoriteList>,
  ) {}
  async register(registerUserParams: RegisterUserParams) {
    const user = await this.usersService.findUserByEmail(
      registerUserParams.email,
    );
    if (user) {
      throw new HttpException(
        'This email is already taken',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (registerUserParams.password.length < 8) {
      throw new HttpException(
        'Password must contain at least 8 characters',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!/[0-9]/.test(registerUserParams.password)) {
      throw new HttpException(
        'The password must contain at least 1 digit',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!/[a-z]/.test(registerUserParams.password)) {
      throw new HttpException(
        'The password must contain a lowercase letter',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!/[A-Z]/.test(registerUserParams.password)) {
      throw new HttpException(
        'The password must contain a uppercase letter',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = encodePassword(registerUserParams.password);
    const newUser = this.userRepository.create({
      email: registerUserParams.email,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);

    const newBucket = this.bucketRepository.create({
      userId: newUser.userId,
    });
    await this.bucketRepository.save(newBucket);

    const newFavoriteList = this.favoriteListRepository.create({
      userId: newUser.userId,
    });
    await this.favoriteListRepository.save(newFavoriteList);

    const payload = {
      id: newUser.userId,
      email: registerUserParams.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const registeredUser = await this.usersService.findUserByEmail(
      registerUserParams.email,
    );

    const newToken = this.tokenRepository.create({
      token: accessToken,
      userId: registeredUser.userId,
    });

    await this.tokenRepository.save(newToken);
    return {
      userId: newUser.userId,
      token: accessToken,
    };
  }
  async signIn(signInUserParams: SignInUserParams) {
    const user = await this.usersService.findUserByEmail(
      signInUserParams.email,
    );
    if (!user) {
      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!comparePasswords(signInUserParams.password, user.password)) {
      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = {
      id: user.userId,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const newToken = this.tokenRepository.create({
      token: accessToken,
      userId: user.userId,
    });

    await this.tokenRepository.save(newToken);
    return {
      userId: user.userId,
      token: accessToken,
    };
  }
  async logout(userId: number) {
    await this.tokenRepository.delete({ userId });
  }
}
