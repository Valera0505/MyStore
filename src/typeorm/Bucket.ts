import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Product } from './Product';
import { BucketItem } from './BucketItem';

@Entity('buckets')
export class Bucket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  // @ManyToMany(() => Product)
  // @JoinTable({
  //   name: 'bucketProducts',
  //   joinColumn: { name: 'bucketId', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
  // })
  // products: Product[];
  @OneToMany(() => Product, (product) => product.bucket)
  products: Product[];

  @OneToOne(() => User, (user) => user.bucket)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;

  @OneToMany(() => BucketItem, (bucketItem) => bucketItem.bucket)
  bucketItems: BucketItem[];
}
