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
import { Sweet } from '../entities/sweet.entity';
import { SweetController } from './controllers/sweet.controller';
import { Vine } from '../entities/vine.entity';
import { VineController } from './controllers/vine.controller';
import { FileService } from '../shared/services/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProducerEntity, Color, Country, Sweet, Vine]),
    ConfigModule,
    AuthModule,
  ],
  providers: [...ClientProvider, FileService],
  controllers: [ProducerController, ColorController, CountryController, SweetController, VineController],
})
export class ClientModule {
}