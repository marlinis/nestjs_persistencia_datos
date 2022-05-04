import { Controller, Get, Param, Query } from '@nestjs/common';
import { query } from 'express';
import { get } from 'http';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // recibimos pra metros con Get//
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('nuevo')
  newEndpoint() {
    return 'Soy MArlon el nuevo';
  }
  @Get('/ruta/')
  hola() {
    return 'con /sass/';
  }

  @Get('tasks')
  tasks() {
    return this.appService.getTasks();
  }
}
