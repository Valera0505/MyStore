import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Bucket } from './Bucket';
import { Product } from './Product';

@Entity({ name: 'bucketItems' })
export class BucketItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bucketId: number;

  @Column()
  productId: number;

  @Column()
  amount: number;

  @ManyToOne(() => Bucket, (bucket) => bucket.bucketItems)
  @JoinColumn({ name: 'bucketId', referencedColumnName: 'id' })
  bucket: Bucket;

  @ManyToOne(() => Product, (product) => product.bucketItems)
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  product: Product;
}
