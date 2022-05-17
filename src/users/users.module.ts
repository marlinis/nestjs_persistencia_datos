import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConstumersController } from './controllers/constumers.controller';
import { ConstumersService } from './services/constumers.service';
import { Constumer } from './entities/constumer.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/users.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

import { ProductsModule } from '../products/products.module';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderItemService } from './services/order-item.service';
import { OrderItemController } from './controllers/order-item.controller';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Constumer, Order, OrderItem]),
  ],
  controllers: [
    ConstumersController,
    UsersController,
    OrdersController,
    OrderItemController,
    ProfileController,
  ],
  providers: [ConstumersService, UsersService, OrdersService, OrderItemService],
  exports: [UsersService], //para ser usado desde otro modulo cualquiera.
})
export class UsersModule {}
