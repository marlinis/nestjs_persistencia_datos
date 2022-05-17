import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './../../users/services/users.service';
import { User } from './../../users/entities/users.entity';
import { PayloadToken } from './../models/model.token';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, //injectando la dependencias del servicio para tocken
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email); //llamado a findByemail del servicio usersServices
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password); //comparamos el password digitado con el almacenado
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
