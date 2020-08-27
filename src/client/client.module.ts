import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerEntity } from '../entities/producer.entity';
import { ProducerController } from './controllers/producer.controller';
import { ClientProvider } from './client.provider';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { ColorController } from './controllers/color.controller';
import { Color } from '../entities/color.entity';
import { Country } from '../entities/country.entity';
import { CountryController } from './controllers/country.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProducerEntity, Color, Country]),
    ConfigModule,
    AuthModule,
  ],
  providers: [...ClientProvider],
  controllers: [ProducerController, ColorController, CountryController],
})
export class ClientModule {
}