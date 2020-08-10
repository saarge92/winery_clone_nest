import { IsNotEmpty } from 'class-validator';

export class ProducerDto {
  @IsNotEmpty()
  name: string;
}