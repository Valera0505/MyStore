import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateCategoryDto } from '../categories/dtos/CreateCategory.dto';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { AddProductDto } from './dtos/AddProduct.dto';

@Controller('api/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  // @Get(':productName')
  // async getProductsGroupedByName(@Param('productName') productName: string) {
  //   const groupedProducts =
  //     this.productsService.findProductsGroupedByName(productName);
  //   return groupedProducts;
  // }
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.createProduct(createProductDto);
    return product;
  }

  @Get('id/:productId')
  async getProductById(@Param('productId', ParseIntPipe) productId: number) {
    const product = await this.productsService.findProductById(productId);
    return product;
  }

  @Post('id/:productId/bucket')
  async addProductToBucket(
    @Body() addProductDto: AddProductDto,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.productsService.addProductToBucket(
      addProductDto.userId,
      productId,
    );
  }

  @Post('id/:productId/favoriteList')
  async addProductToFavoriteList(
    @Body() addProductDto: AddProductDto,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.productsService.addProductToFavoriteList(
      addProductDto.userId,
      productId,
    );
  }

  @Get()
  async getProducts() {
    return this.productsService.findProducts();
  }

  @Get('category/:categoryType')
  async getProductsByCategoryName(@Param('categoryType') categoryType: string) {
    return this.productsService.findProductsByCategoryType(categoryType);
  }
}
