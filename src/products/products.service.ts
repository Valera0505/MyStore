import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../typeorm/Product';
import { Repository } from 'typeorm';
import { CreateCategoryParams, CreateProductParams } from '../utils/types';
import { Category } from '../typeorm/Category';
import { UsersService } from '../users/users.service';
import { UsersBucketsService } from '../users/users-buckets.service';
import { BucketItem } from '../typeorm/BucketItem';
import { FavoriteListItem } from '../typeorm/FavoriteListItem';
import { UsersFavoriteListService } from '../users/users-favorite-lists.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private usersService: UsersService,
    private usersBucketService: UsersBucketsService,
    private usersFavoriteListService: UsersFavoriteListService,
    @InjectRepository(BucketItem)
    private bucketItemRepository: Repository<BucketItem>,
    @InjectRepository(FavoriteListItem)
    private favoriteListItemRepository: Repository<FavoriteListItem>,
  ) {}

  async findProducts() {
    return this.productRepository.find({ relations: ['category'] });
  }

  async findProductById(productId: number) {
    return this.productRepository.findOne({ where: { id: productId } });
  }

  async findProductsGroupedByName(productName: string) {
    return this.productRepository
      .createQueryBuilder('product')
      .select('product.name', 'name')
      .addSelect('ARRAY_AGG(product) as products')
      .groupBy('product.name')
      .getRawMany();
  }
  async createProduct(productParams: CreateProductParams) {
    const category = await this.categoryRepository.findOne({
      where: { name: productParams.categoryName },
    });
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    const newProduct = this.productRepository.create(productParams);
    newProduct.category = category;
    return this.productRepository.save(newProduct);
  }

  async addProductToBucket(userId: number, productId: number) {
    const user = await this.usersService.findUserById(userId);

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!user || !product) {
      throw new HttpException(
        'User or product not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const bucket = await this.usersBucketService.findBucketByUserId(userId);

    const bucketItem = await this.usersBucketService.findBucketItem(
      bucket.id,
      productId,
    );

    if (bucketItem) {
      bucketItem.amount++;
      await this.bucketItemRepository.save(bucketItem);
    } else {
      const newBucketItem = await this.usersBucketService.createBucketItem(
        bucket.id,
        productId,
      );
      await this.bucketItemRepository.save(newBucketItem);
    }
  }

  async findProductsByCategoryType(categoryType: string) {
    return this.productRepository
      .createQueryBuilder('product')
      .innerJoin('product.category', 'category')
      .where('category.type = :type', { type: categoryType })
      .getMany();
  }

  async addProductToFavoriteList(userId: number, productId: number) {
    const user = await this.usersService.findUserById(userId);

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!user || !product) {
      throw new HttpException(
        'User or product not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const favoriteList =
      await this.usersFavoriteListService.findFavoriteListByUserId(userId);

    const favoriteListItem =
      await this.usersFavoriteListService.findFavoriteListItem(
        favoriteList.id,
        productId,
      );
    console.log(favoriteListItem);

    if (favoriteListItem) {
      throw new HttpException(
        'The product is already in Favorite List',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const newFavoriteListItem =
        await this.usersFavoriteListService.createFavoriteListItem(
          favoriteList.id,
          productId,
        );
      await this.favoriteListItemRepository.save(newFavoriteListItem);
    }
  }
}
