import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Constumer } from '../entities/constumer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/constumer.dtos';

@Injectable()
export class ConstumersService {
  constructor(
    @InjectRepository(Constumer) private customerRepo: Repository<Constumer>,
  ) {}
  // private counterId = 1;
  // private customers: Constumer[] = [
  //   {
  //     id: 1,
  //     name: 'Nicolas',
  //     lastName: 'Molina',
  //     phone: '3111111212',
  //   },
  // ];

  async findAll() {
    return await this.customerRepo.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Cliente #${id} not found`);
    }
    return customer;
  }

  async create(data: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(data);
    return await this.customerRepo.save(newCustomer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    this.customerRepo.merge(customer, changes);
    return this.customerRepo.save(customer);
  }

  async remove(id: number) {
    const customer = await this.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Cliente #${id} not found`);
    }
    return this.customerRepo.delete(customer);
  }
}
