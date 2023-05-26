import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Column,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Product } from './Product';
import { User } from './User';
import { BucketItem } from './BucketItem';
import { FavoriteListItem } from './FavoriteListItem';

@Entity({ name: 'favoriteList' })
export class FavoriteList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  // @ManyToMany(() => Product)
  // @JoinTable({ name: 'favoriteListProducts' })
  // products: Product[];

  @ManyToOne(() => User, (user) => user.favoriteLists)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;

  @OneToMany(
    () => FavoriteListItem,
    (favoriteListItem) => favoriteListItem.favoriteList,
  )
  favoriteListItems: FavoriteListItem[];
}
