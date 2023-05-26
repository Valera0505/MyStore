import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinTable,
} from 'typeorm';
import { Token } from './Token';
import { FavoriteList } from './FavoriteList';
import { Bucket } from './Bucket';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Token, (token) => token.user, {
    cascade: true,
  })
  tokens: Token[];

  @OneToMany(() => FavoriteList, (favoriteList) => favoriteList.user)
  favoriteLists: FavoriteList[];

  @OneToOne(() => Bucket, (bucket) => bucket.user)
  bucket: Bucket;
}
