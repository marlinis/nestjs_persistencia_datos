import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { ConstumersService } from '../services/constumers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/constumer.dtos';

@ApiTags('constumers')
@Controller('constumers')
export class ConstumersController {
  constructor(private constumersService: ConstumersService) {}

  @Get()
  findAll() {
    return this.constumersService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.constumersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.constumersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.constumersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.constumersService.remove(+id);
  }
}
