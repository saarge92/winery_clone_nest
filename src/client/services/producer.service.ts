import { Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm/index';
import { ProducerEntity } from '../../entities/producer.entity';
import { from, Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { ProducerDto } from '../dto/producer.dto';

@Injectable({ scope: Scope.DEFAULT })
export class ProducerService {
  constructor(@InjectRepository(ProducerEntity) private readonly producerRepository: Repository<ProducerEntity>) {
  }

  public getListOfProducers(): Observable<Array<ProducerEntity>> {
    return from(this.producerRepository.find());
  }

  public async createdProducer(producerDto: ProducerDto): Promise<ProducerEntity> {
    const createdProducer = this.producerRepository.create();
    createdProducer.name = producerDto.name;
    return await this.producerRepository.save(createdProducer);
  }
}