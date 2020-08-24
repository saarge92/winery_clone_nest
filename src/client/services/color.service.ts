import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { Color } from '../../entities/color.entity';
import { IColorService } from '../intefaces/color_service.interface';

/**
 * Service containing business logic of color service
 * @author Serdar Durdyev
 */
export class ColorService implements IColorService {
  constructor(@InjectRepository(Color) private readonly colorRepository: Repository<Color>) {
  }

  /**
   * Get list of colors in our system
   * @param perPage Count page in one list
   * @param currentPage Current page¬
   */
  public async getList(perPage = 10, currentPage = 1): Promise<Color[]> {
    if (perPage > 30) perPage = 30;
    const listOfColors = await this.colorRepository.find({
      skip: (currentPage - 1) * perPage,
    });
    return listOfColors;
  }
}