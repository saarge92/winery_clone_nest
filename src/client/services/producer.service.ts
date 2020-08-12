import { ConflictException, Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm/index';
import { ProducerEntity } from '../../entities/producer.entity';
import { from, Observable, of } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { ProducerDto } from '../dto/producer.dto';
import { IProducerService } from '../intefaces/producer_service.interface';

/**
 * Service class for business logic of producers entity
 * @author Serdar Durdyev
 */
@Injectable({ scope: Scope.DEFAULT })
export class ProducerService implements IProducerService {
  constructor(@InjectRepository(ProducerEntity) private readonly producerRepository: Repository<ProducerEntity>) {
  }

  /**
   * Get list of existed producers in database
   * @param perPage - Count elements in one page
   * @param currentPage - Current page
   */
  public async getListOfProducers(perPage = 10, currentPage = 1): Promise<Observable<ProducerEntity[]>> {
    if (perPage > 30) perPage = 30;
    const paginatedProducerList = await this.producerRepository.find({
      skip: (currentPage - 1) * perPage,
      take: perPage,
    });
    return of(paginatedProducerList);
  }

  public async createdProducer(producerDto: ProducerDto): Promise<ProducerEntity> {
    const createdProducer = this.producerRepository.create();
    createdProducer.name = producerDto.name;
    return await this.producerRepository.save(createdProducer);
  }

  public async getProducerById(id: string): Promise<ProducerEntity> {
    return await this.producerRepository.findOne(id);
  }

  public async updateProducerById(id: string, producerDto: ProducerDto): Promise<ProducerEntity> {
    const existedProducer = await this.producerRepository.findOne(id);
    if (!existedProducer)
      throw new ConflictException('Такой производитель не найден');
    existedProducer.name = producerDto.name;
    await this.producerRepository.save(existedProducer);
    return existedProducer;
  }
}