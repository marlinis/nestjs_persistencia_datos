import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindConditions } from 'typeorm';

import { Product } from './../entities/product.entity';
import { Category } from './../entities/category.entity';
import { Brand } from './../entities/brands.entity';
//import { BrandsService } from './brands.service';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from './../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    //private brandsService: BrandsService,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  //ARRAY EN MEMORIA
  // private counterId = 1;
  // private products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Producto 1',
  //     description: 'lorem lorem',
  //     price: 10000,
  //     stock: 300,
  //     image: 'https://i.imgur.com/U4iGx1j.jpeg',
  //   },
  // ];

  findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindConditions<Product> = {};
      const { limit, offset } = params;
      const { maxPrice, minPrice } = params;
      console.log(minPrice, maxPrice);
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    // const newProduct = new Product();
    // newProduct.name = data.name;
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    // newProduct.image = data.image;
    // return this.productRepo.save(newProduct);

    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandRepo.findOne(data.brandId);
      newProduct.brand = brand;
    }
    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(data.categoriesIds);
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);
    if (changes.brandId) {
      const brand = await this.brandRepo.findOne(changes.brandId);
      product.brand = brand;
    }
    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(
        changes.categoriesIds,
      );
      product.categories = categories;
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }
  //Manipulando arreglo con funcion para quitar una categoria por producto
  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepo.save(product);
  }

  async addCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    const category = await this.categoryRepo.findOne(categoryId);
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return this.productRepo.delete(id);
  }
}
