import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProducerService } from '../services/producer.service';
import { ProducerEntity } from '../../entities/producer.entity';
import { ProducerDto } from '../dto/producer.dto';

@Controller('/producers')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {
  }

  @Get('/')
  public getProducers() {
    return this.producerService.getListOfProducers();
  }

  @Post('/')
  public async createProducer(@Body()producerDto: ProducerDto): Promise<ProducerEntity> {
    return await this.producerService.createdProducer(producerDto);
  }
}