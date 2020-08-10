import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
