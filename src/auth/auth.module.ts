import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { AuthProvider } from './auth.provider';
import { RoleService } from './services/role.service';
import { UserRole } from '../entities/user_role.entity';
import { Role } from '../entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole, Role]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES'),
        },
      }),
    }),
  ],
  providers: [AuthService, ...AuthProvider, RoleService],
  controllers: [AuthController],
  exports: [...AuthProvider],
})
export class AuthModule {

}