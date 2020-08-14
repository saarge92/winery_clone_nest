import { Body, ConflictException, Controller, Get, Inject, Param, Post, Put, Req } from '@nestjs/common';
import { ProducerEntity } from '../../entities/producer.entity';
import { ProducerDto } from '../dto/producer.dto';
import { IProducerService } from '../intefaces/producer_service.interface';
import { PRODUCER_SERVICE } from '../constants/client.constants';
import { Request } from 'express';

/**
 * Controller for serving requests about producers
 * @author Serdar Durdyev
 */
@Controller('/producers')
export class ProducerController {
  constructor(@Inject(PRODUCER_SERVICE) private readonly producerService: IProducerService) {
  }

  /**
   * Getting List of producers
   */
  @Get('/')
  public getProducers(@Req()request: Request) {
    const perPage: any = request.query.perPage ?? 10;
    const currentPage: any = request.query.currentPage ?? 1;
    if (typeof perPage == 'string' || typeof currentPage == 'string')
      throw new ConflictException('Укажите числа в запросах пагинации');
    return this.producerService.getListOfProducers(perPage as number, currentPage as number);
  }

  /**
   * Post data about new producer
   * @param producerDto Forms which contains data about creating new producer
   * @return {ProducerEntity} Вернет созданного производителя
   */
  @Post('/')
  public async createProducer(@Body()producerDto: ProducerDto): Promise<ProducerEntity> {
    return await this.producerService.createProducer(producerDto);
  }

  /**
   * Getting producer by id
   * @param id - Id of requested producer
   */
  @Get('/:id')
  public async getProducerById(@Param()id: string) {
    return await this.producerService.getProducerById(id);
  }

  /**
   * Update existed producer in database
   * @param id Id of requested producer
   * @param producerDto Form which contains data about new producer
   */
  @Put('/:id')
  public async updateProducerById(@Param('id') id: string, @Body()producerDto: ProducerDto) {
    return await this.producerService.updateProducerById(id, producerDto);
  }
}