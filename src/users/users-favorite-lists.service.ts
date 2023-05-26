import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteList } from '../typeorm/FavoriteList';
import { FavoriteListItem } from '../typeorm/FavoriteListItem';

@Injectable()
export class UsersFavoriteListService {
  constructor(
    @InjectRepository(FavoriteList)
    private favoriteListRepository: Repository<FavoriteList>,
    @InjectRepository(FavoriteListItem)
    private favoriteListItemRepository: Repository<FavoriteListItem>,
  ) {}
  async createFavoriteList(userId: number) {
    const newFavoriteList = this.favoriteListRepository.create({ userId });
    return this.favoriteListRepository.save(newFavoriteList);
  }

  async findFavoriteListByUserId(userId: number) {
    const favoriteList = this.favoriteListRepository.findOne({
      where: { userId },
      relations: ['favoriteListItems'],
    });
    return favoriteList;
  }

  async findFavoriteListItem(favoriteListId: number, productId: number) {
    const favoriteListItem = this.favoriteListItemRepository.findOne({
      where: { favoriteListId, productId },
    });
    return favoriteListItem;
  }

  async findFavoriteListProducts(userId: number) {
    const favoriteList = await this.favoriteListRepository.findOne({
      where: { userId },
    });
    const favoriteListItems = this.favoriteListItemRepository.find({
      where: { favoriteListId: favoriteList.id },
      relations: ['product'],
    });
    return favoriteListItems;
  }

  async createFavoriteListItem(favoriteListId: number, productId: number) {
    const newFavoriteListItem = this.favoriteListItemRepository.create({
      favoriteListId,
      productId,
    });
    return newFavoriteListItem;
  }
}
