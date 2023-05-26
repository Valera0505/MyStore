import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product';
import { FavoriteList } from './FavoriteList';

@Entity({ name: 'favoriteListItems' })
export class FavoriteListItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  favoriteListId: number;

  @Column()
  productId: number;

  @ManyToOne(
    () => FavoriteList,
    (favoriteList) => favoriteList.favoriteListItems,
  )
  @JoinColumn({ name: 'favoriteListId', referencedColumnName: 'id' })
  favoriteList: FavoriteList;

  @ManyToOne(() => Product, (product) => product.favoriteListItems)
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  product: Product;
}
