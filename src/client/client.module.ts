import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerEntity } from '../entities/producer.entity';
import { ProducerController } from './controllers/producer.controller';
import { ClientProvider } from './client.provider';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProducerEntity]),
    ConfigModule,
    AuthModule,
  ],
  providers: [...ClientProvider],
  controllers: [ProducerController],
})
export class ClientModule {
}