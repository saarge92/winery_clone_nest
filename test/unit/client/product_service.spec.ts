import { IProducerService } from '../../../src/client/intefaces/producer_service.interface';
import { getConnection, Repository } from 'typeorm/index';
import { ProducerEntity } from '../../../src/entities/producer.entity';
import { TestingModule, Test } from '@nestjs/testing';
import { ClientProvider } from '../../../src/client/client.provider';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { PRODUCER_SERVICE } from '../../../src/client/constants/client.constants';
import { connectionName, connectionParameters } from '../../connections/connection';
import { ProducerService } from '../../../src/client/services/producer.service';
import { ClientModule } from '../../../src/client/client.module';

describe('Product Service test', () => {
  let producerService: IProducerService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        ...connectionParameters,
        entities: [ProducerEntity],
      }),
        ClientModule,
      ],
      providers: [
        ...ClientProvider,
        {
          provide: getRepositoryToken(ProducerEntity),
          useClass: Repository,
        },
      ],
    }).compile();
    producerService = module.get<ProducerService>(PRODUCER_SERVICE);
  });

  it('Create producer', async () => {
    const createData = {
      name: 'Vina',
    };
    const createdProducer = await producerService.createProducer(createData);
    expect(true).toBe(createdProducer instanceof ProducerEntity);
  });

  afterAll(() => {
    getConnection(connectionName).close();
  });

});