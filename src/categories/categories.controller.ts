import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/CreateCategory.dto';

@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Get()
  async getCategories() {
    const categories = await this.categoriesService.findCategories();
    return categories;
  }

  @Get(':categoryName')
  async getProductsByCategoryName(@Param('categoryName') categoryName: string) {
    const products = await this.categoriesService.findProductsByCategoryName(
      categoryName,
    );
    return products;
  }
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoriesService.createCategory(
      createCategoryDto,
    );
    return category;
  }
}
