import { Color } from '../../entities/color.entity';

export interface IColorService {
  getList(perPage: number, currentPage: number): Promise<Color[]>
}