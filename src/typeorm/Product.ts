import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { FavoriteList } from './FavoriteList';
import { Category } from './Category';
import { Bucket } from './Bucket';
import { BucketItem } from './BucketItem';
import { FavoriteListItem } from './FavoriteListItem';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  image_url: string;

  @Column()
  size: number;

  @Column()
  amount: number;

  @Column()
  categoryName: string;

  //@ManyToMany(() => FavoriteList, (favoriteList) => favoriteList.products)
  // favoriteLists: FavoriteList[];

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' })
  category: Category;

  // @ManyToMany(() => Bucket, (bucket) => bucket.products) s;
  // buckets: Bucket[];
  @ManyToOne(() => Bucket, (bucket) => bucket.products)
  @JoinColumn({ name: 'bucketId', referencedColumnName: 'id' })
  bucket: Bucket;

  @OneToMany(() => BucketItem, (bucketItem) => bucketItem.product)
  bucketItems: BucketItem[];

  @OneToMany(
    () => FavoriteListItem,
    (favoriteListItem) => favoriteListItem.product,
  )
  favoriteListItems: FavoriteListItem[];
}
