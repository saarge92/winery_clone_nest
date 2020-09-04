import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(), ClientModule, AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
}
