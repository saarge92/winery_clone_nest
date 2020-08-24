import { Color } from '../../entities/color.entity';
import { ColorDto } from '../dto/color.dto';

export interface IColorService {
  getList(perPage: number, currentPage: number): Promise<Color[]>

  createColor(colorDto: ColorDto): Promise<Color>;

  deleteColor(id: string);
}