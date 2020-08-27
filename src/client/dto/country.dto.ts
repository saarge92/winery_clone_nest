import { IsEmpty, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CountryDto {
  @IsNotEmpty()
  @Length(3, 255)
  name_rus: string;

  @IsOptional()
  @Length(3, 255)
  name_en: string;
}