import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vine } from '../../entities/vine.entity';
import { Repository } from 'typeorm/index';
import { VineDto } from '../dto/vine.dto';
import { Color } from '../../entities/color.entity';
import { Country } from '../../entities/country.entity';
import { ProducerEntity } from '../../entities/producer.entity';
import { FileService } from '../../shared/services/file.service';
import { IVineService } from '../intefaces/vine_service_interface';

@Injectable()
export class VineService implements IVineService {
  constructor(@InjectRepository(Vine) private readonly vineRepository: Repository<Vine>,
              @InjectRepository(Color) private readonly colorRepository: Repository<Color>,
              @InjectRepository(Country) private readonly countryRepository: Repository<Country>,
              @InjectRepository(ProducerEntity) private readonly producerRepository: Repository<ProducerEntity>,
              private readonly fileService: FileService) {
  }

  /**
   * Create vine in our system
   * @param vineDto Data transfer object about vines creation
   * @param file File with image of vine
   */
  public async createVine(vineDto: VineDto, file: any): Promise<Vine> {
    const newVine = new Vine();
    await this.checkRulesValidationRules(vineDto);
    this.initParamsForVine(newVine, vineDto);
    await this.saveFileForVine(file, newVine);
    await this.vineRepository.save(newVine);
    return newVine;
  }

  /**
   * Saving file image for vine
   * @param file File data of image
   * @param vine Vine instance for saving image path
   */
  private async saveFileForVine(file: any, vine: Vine) {
    const pathForSave = '../public/vines/';
    const generatedNewNameFile = await this.fileService.generateFileName(file.originalname);
    const fullPath = pathForSave + generatedNewNameFile;
    await this.fileService.saveFile(fullPath, file);
    vine.image_src = fullPath;
  }

  /**
   * Check validation rules of vines data transfer object
   * @param vineDto Data transfer object with parameters of new vine
   */
  private async checkRulesValidationRules(vineDto: VineDto) {
    if (vineDto.color_id) {
      const color = await this.colorRepository.findOne(vineDto.color_id);
      if (!color)
        throw new ConflictException('Цвет с таким Id не найден');
    }

    if (vineDto.country_id) {
      const country = await this.countryRepository.findOne(vineDto.country_id);
      if (!country)
        throw new ConflictException('Страна с таким id не найдена');
    }

    if (vineDto.producer_id) {
      const producer = await this.producerRepository.findOne(vineDto.producer_id);
      if (!producer)
        throw new ConflictException('Производитель с таким Id не найден');
    }

    if (vineDto.sweet_id) {
      const sweet = await this.vineRepository.findOne(vineDto.sweet_id);
      if (!sweet)
        throw new ConflictException('Сладость вина с таким id не найден');
    }
  }

  /**
   * Initiate parameters for vine
   * @param vine Initiating new vine
   * @param vineDto Data transfer object about new vine
   */
  private initParamsForVine(vine: Vine, vineDto: VineDto) {
    if (vineDto.producer_id) vine.producer_id = vineDto.producer_id;
    if (vineDto.country_id) vine.country_id = vineDto.country_id;
    if (vineDto.color_id) vine.color_id = vineDto.color_id;
    if (vineDto.sweet_id) vine.sweet_id = vineDto.sweet_id;
    if (vineDto.name_en) vine.nameEn = vineDto.name_en;
    if (vineDto.sort_contain) vine.sort_contain = vineDto.sort_contain;
    if (vineDto.year) vine.year = vineDto.year;

    vine.nameRus = vineDto.name_rus;
    vine.volume = vineDto.volume;
    vine.strength = vineDto.strength;
    vine.price = vineDto.price;
  }
}