import { IsDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, Length } from 'class-validator';

export class VineDto {
  @IsNotEmpty()
  @Length(3, 255)
  name_rus: string;

  @IsOptional()
  @Length(3, 255)
  name_en: string;

  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @IsOptional()
  @IsNumber()
  price_cup: number;

  @IsNotEmpty()
  @IsDecimal()
  volume: number;

  @IsOptional()
  @IsInt()
  year: number;

  @IsNotEmpty()
  @IsDecimal()
  strength: number;

  @IsOptional()
  @Length(3, 2048)
  sort_contain: string;

  @IsOptional()
  country_id: string;

  @IsOptional()
  color_id: string;

  @IsOptional()
  sweet_id: string;

  @IsOptional()
  producer_id: string;
}