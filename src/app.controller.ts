import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { query } from 'express';
import { get } from 'http';
import { AppService } from './app.service';

import { ApiKeyGuard } from './auth/guards/api-key.guard'; //el guardian creado en el modulo auth

import { Public } from './auth/docorators/public.decorator'; //usando el decorador creado por usuario

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // recibimos pra metros con Get//

  //@SetMetadata('isPublic', true) //permitiendo hacer uso del endpoint
  @Public() //decorador en decorators aplicado
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //@UseGuards(ApiKeyGuard) //protegiendo la ruta solo de este endpoints
  //@SetMetadata('isPublic', true) //permitiendo hacer uso del endpoint
  @Public() //decorador en decorators aplicado
  @Get('nuevo')
  newEndpoint() {
    return 'Soy Marlon el nuevo desde POSTGRESS';
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
