import { IProducerService } from '../../../src/client/intefaces/producer_service.interface';
import { getConnection, getRepository, Repository } from 'typeorm/index';
import { ProducerEntity } from '../../../src/entities/producer.entity';
import { TestingModule, Test } from '@nestjs/testing';
import { ClientProvider } from '../../../src/client/client.provider';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { PRODUCER_SERVICE } from '../../../src/client/constants/client.constants';
import { connectionName, connectionParameters } from '../../connections/connection';
import { ProducerService } from '../../../src/client/services/producer.service';
import { ClientModule } from '../../../src/client/client.module';
import * as fakerStatic from 'faker';
import { Color } from '../../../src/entities/color.entity';

describe('Product Service test', () => {
  let producerService: IProducerService;
  let producerRepository: Repository<ProducerEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        ...connectionParameters,
        entities: [ProducerEntity, Color],
      }),
        ClientModule,
      ],
      providers: [
        ...ClientProvider,
        {
          provide: getRepositoryToken(ProducerEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Color),
          useClass: Repository,
        },
      ],
    }).compile();
    producerService = module.get<ProducerService>(PRODUCER_SERVICE);
    producerRepository = getRepository(ProducerEntity);
  });

  it('Should return created producer', async () => {
    const createData = {
      name: 'Vina',
    };
    const createdProducer = await producerService.createProducer(createData);
    expect(true).toBe(createdProducer instanceof ProducerEntity);
  });

  it('Should return list of producers', async () => {
    const listOfProducers = await (await (producerService.getListOfProducers())).toPromise();
    expect(listOfProducers).toBeDefined();
    if (listOfProducers.length > 0) {
      expect(true).toBe(listOfProducers[0] instanceof ProducerEntity);
    }
  });

  it('Should update users', async () => {
    const randomProducer = await producerRepository.createQueryBuilder()
      .orderBy('RAND()').getOne();
    const updateParams = {
      name: fakerStatic.company.companyName(),
    };
    const updatedData = await producerService.updateProducerById(randomProducer.id, updateParams);
    expect(true).toBe(updatedData instanceof ProducerEntity);
  });

  afterAll(() => {
    getConnection(connectionName).close();
  });

});