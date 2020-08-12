import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerEntity } from '../entities/producer.entity';
import { ProducerController } from './controllers/producer.controller';
import { ClientProvider } from './client.provider';

@Module({
  imports: [TypeOrmModule.forFeature([ProducerEntity])],
  providers: [...ClientProvider],
  controllers: [ProducerController],
})
export class ClientModule {
}