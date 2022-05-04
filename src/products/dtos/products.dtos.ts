import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  //Traer el atributo de la relación
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoriesIds: number[];
}
//export class UpdateProductDto {
//  readonly name?: string;
// readonly description?: string;
// readonly price?: number;
// readonly stock?: number;
// readonly image?: string;
//}//
export class UpdateProductDto extends PartialType(CreateProductDto) {}

//Creando nuevo dto para filtrar y paginar Productos

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;

  //Para validar y filtracios segun rango.

  @IsOptional()
  @IsPositive()
  minPrice: number;

  @ValidateIf((item) => item.minPrice) //si esxiste un precion minimo el maximo es obligatorio
  @IsPositive()
  maxPrice: number;
}
