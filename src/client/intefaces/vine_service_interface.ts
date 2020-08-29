import { VineDto } from '../dto/vine.dto';
import { Vine } from '../../entities/vine.entity';

export interface IVineService {
  createVine(vineDto: VineDto, file: any): Promise<Vine>;
}