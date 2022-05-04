import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../entities/brands.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dtos';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}
  // private counterId = 1;
  // private brands: Brand[] = [
  //   {
  //     id: 1,
  //     name: 'Brand 1',
  //     image: 'https://i.imgur.com/U4iGx1j.jpeg',
  //   },
  // ];

  findAll() {
    return this.brandRepo.find();
  }

  findOne(id: number) {
    const brand = this.brandRepo.findOne(id, {
      relations: ['products'],
    });
    if (!brand) {
      throw new NotFoundException(`La Marca #${id} not found`);
    }
    return brand;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.brandRepo.create(data);
    return this.brandRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.brandRepo.findOne(id);
    this.brandRepo.merge(brand, changes);
    return this.brandRepo.save(brand);
    // const brand = this.findOne(id);
    // const index = this.brands.findIndex((item) => item.id === id);
    // this.brands[index] = {
    //   ...brand,
    //   ...changes,
    // };
    // return this.brands[index];
  }

  async remove(id: number) {
    const brand = await this.brandRepo.findOne(id);
    if (!brand) {
      throw new NotFoundException(`La marca #${id} not found`);
    }
    return this.brandRepo.delete(id);
    // const index = this.brands.findIndex((item) => item.id === id);
    // if (index === -1) {
    //   throw new NotFoundException(`Brand #${id} not found`);
    // }
    // this.brands.splice(index, 1);
    // return true;
  }
}
