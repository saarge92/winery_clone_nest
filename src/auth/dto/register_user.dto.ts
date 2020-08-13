import { IsEmail, Length, MinLength } from 'class-validator';

export class UserRegisterDto {
  @IsEmail({}, {})
  email: string;

  @Length(6, 255)
  password: string;

  @Length(2, 1024, { message: 'Укажите размер строки от 2 до 1024' })
  name: string;
}