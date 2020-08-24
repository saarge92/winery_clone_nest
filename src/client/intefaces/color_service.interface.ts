import { Color } from '../../entities/color.entity';
import { ColorDto } from '../dto/color.dto';

/**
 * Interface for business color
 */
export interface IColorService {
  getList(perPage: number, currentPage: number): Promise<Color[]>

  createColor(colorDto: ColorDto): Promise<Color>;

  deleteColor(id: string);

  updateColor(id: string, colorDto: ColorDto): Promise<Color>;

  getColor(id: string): Promise<Color>;
}