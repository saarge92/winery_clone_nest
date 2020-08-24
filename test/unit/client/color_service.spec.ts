import { IColorService } from '../../../src/client/intefaces/color_service.interface';
import { getRepository, Repository } from 'typeorm/index';
import { Color } from '../../../src/entities/color.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { connectionParameters } from '../../connections/connection';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ColorService } from '../../../src/client/services/color.service';
import { ColorDto } from '../../../src/client/dto/color.dto';
import * as faker from 'faker';

describe('Color Service test', () => {
  let colorService: IColorService;
  let colorRepository: Repository<Color>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...connectionParameters,
          entities: [Color],
        }),
      ],
      providers: [
        ColorService,
        {
          provide: getRepositoryToken(Color),
          useClass: Repository,
        },
      ],
    }).compile();
    colorRepository = getRepository(Color);
    colorService = new ColorService(colorRepository);
  });

  it('Should create color in our system', async () => {
    const colorDto = new ColorDto();
    colorDto.name = faker.company.companyName();
    const createdColor = await colorService.createColor(colorDto);

    expect(true).toBe(createdColor instanceof Color);
  });
});