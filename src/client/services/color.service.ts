import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { Color } from '../../entities/color.entity';
import { IColorService } from '../intefaces/color_service.interface';
import { ColorDto } from '../dto/color.dto';
import { ConflictException } from '@nestjs/common';

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

  /**
   * Create color in our system
   * @param colorDto Color transfer object for creation color in our system
   * @returns {Promise<Color>} Returns asynchronously created color
   */
  public async createColor(colorDto: ColorDto): Promise<Color> {
    const newColor = new Color();
    newColor.name = colorDto.name;
    await this.colorRepository.save(newColor);
    return newColor;
  }

  /**
   * Delete color by id
   * @param id Id Color
   */
  public async deleteColor(id: string) {
    const existColor = await this.colorRepository.delete(id);
    if (!existColor)
      throw new ConflictException('Такой цвет не найден в системе');
    await this.colorRepository.delete({ id });
  }
}