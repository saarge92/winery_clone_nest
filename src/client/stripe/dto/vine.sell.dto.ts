import { IsArray, IsCreditCard, IsEmail, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class VineSellDto {

  @IsArray()
  vines: Array<VineInfoDto>;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsCreditCard()
  @IsNotEmpty()
  card_number: string;

  @IsNotEmpty()
  csv_code: string;

  @IsNotEmpty()
  @Length(3, 255)
  card_holder: string;

  @IsInt()
  expires_month: number;

  @IsInt()
  expires_year:number;
}

export class VineInfoDto {
  @IsNotEmpty()
  @IsString()
  vineId: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}