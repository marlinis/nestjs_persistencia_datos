import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Constumer } from '../entities/constumer.entity';
import { Order } from '../entities/order.entity';
import { User } from '../entities/users.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Constumer) private customerRepo: Repository<Constumer>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne(id, {
      relations: ['items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException(`order ${id} not found`);
    }
    return order;
  }

  async ordersByCustomer(userId: number) {
    const customerId = (
      await this.userRepo.findOne(userId, { relations: ['customer'] })
    ).customer.id;
    return this.orderRepo.find({
      where: {
        customer: customerId,
      },
      relations: ['items', 'items.product'],
    });
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    if (data.customerId) {
      const customer = await this.customerRepo.findOne(data.customerId);
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne(id);
    if (changes.customerId) {
      const customer = await this.customerRepo.findOne(changes.customerId);
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  delete(id: number) {
    return this.orderRepo.delete(id);
  }
}
