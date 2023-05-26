import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../typeorm/Category';
import { Repository } from 'typeorm';
import { CreateCategoryParams } from '../utils/types';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async findCategories() {
    return this.categoryRepository.find({ relations: ['products'] });
  }
  async findCategoryByName(categoryName: string) {
    const category = await this.categoryRepository.findOne({
      where: { name: categoryName },
    });
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return category;
  }
  async createCategory(categoryParams: CreateCategoryParams) {
    const newCategory = this.categoryRepository.create(categoryParams);
    return this.categoryRepository.save(newCategory);
  }

  async findProductsByCategoryName(categoryName: string) {
    const category = await this.categoryRepository.findOne({
      where: { name: categoryName },
      relations: ['products'],
    });
    const products = category.products;
    return products;
  }

  async findProductsByCategoryType(categoryType: string) {
    const category = await this.categoryRepository.findOne({
      where: { name: categoryType },
      relations: ['products'],
    });
    const products = category.products;
    return products;
  }
}
