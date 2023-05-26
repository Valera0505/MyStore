import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bucket } from '../typeorm/Bucket';
import { Repository } from 'typeorm';
import { BucketItem } from '../typeorm/BucketItem';

@Injectable()
export class UsersBucketsService {
  constructor(
    @InjectRepository(Bucket) private bucketRepository: Repository<Bucket>,
    @InjectRepository(BucketItem)
    private bucketItemRepository: Repository<BucketItem>,
  ) {}
  async createBucket(userId: number) {
    const newBucket = this.bucketRepository.create({ userId });
    return this.bucketRepository.save(newBucket);
  }

  async findBucketByUserId(userId: number) {
    const bucket = await this.bucketRepository.findOne({
      where: { userId },
      relations: ['bucketItems'],
    });
    return bucket;
  }

  async findBucketProducts(userId: number) {
    const bucket = await this.bucketRepository.findOne({
      where: { userId },
    });
    const bucketItems = this.bucketItemRepository.find({
      where: { bucketId: bucket.id },
      relations: ['product'],
    });
    return bucketItems;
  }

  async findBucketItem(bucketId: number, productId: number) {
    const bucketItem = this.bucketItemRepository.findOne({
      where: { bucketId, productId },
    });
    return bucketItem;
  }

  async createBucketItem(bucketId: number, productId: number) {
    const newBucketItem = this.bucketItemRepository.create({
      bucketId,
      productId,
      amount: 1,
    });
    return newBucketItem;
  }
}
