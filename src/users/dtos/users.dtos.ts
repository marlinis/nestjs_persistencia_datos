import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  // readonly name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly role: string;

  @IsOptional()
  @ApiProperty()
  @IsPositive()
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
