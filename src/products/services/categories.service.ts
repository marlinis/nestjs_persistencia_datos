import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { merge } from 'rxjs';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}
  // private counterId = 1;
  // private categories: Category[] = [
  //   {
  //     id: 1,
  //     name: 'Category 1',
  //   },
  // ];

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne(id, {
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Categoria #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(data);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.findOne(id);
    this.categoryRepo.merge(category, changes);
    return this.categoryRepo.save(category);
  }

  remove(id: number) {
    const category = this.categoryRepo.findOne(id);
    if (!category) {
      throw new NotFoundException(`La categoria #${id} not found`);
    }
    return this.categoryRepo.delete(id);
  }
}
