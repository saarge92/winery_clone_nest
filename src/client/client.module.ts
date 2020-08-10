import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerEntity } from '../entities/producer.entity';
import { ProducerService } from './services/producer.service';
import { ProducerController } from './controllers/producer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProducerEntity])],
  providers: [ProducerService],
  controllers: [ProducerController],
})
export class ClientModule {
}