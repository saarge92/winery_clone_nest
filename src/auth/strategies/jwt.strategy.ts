import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { USER_SERVICE } from '../constants/auth.constants';
import { IUserService } from '../interfaces/user_service.interface';

/**
 * Jwt strategy for authentication user
 * You must specify Bearer authentication in Authorization header
 *
 * @author Serdar Durdyev
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService,
              @Inject(USER_SERVICE) private readonly userService: IUserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      issuer: configService.get<string>('JWT_ISSUER'),
    });
  }

  /**
   * Validate jwt payload in our system
   * Check if user exist in our system
   * @param payload Jwt payload
   */
  public async validate(payload: any) {
    if (!payload.user || !payload.name)
      throw new UnauthorizedException('Неверный токен пользователя');

    const user = await this.userService.getUserByEmail(payload.user);
    if (!user)
      throw new UnauthorizedException('Пользователь не найден');

    return { email: user.email, id: user.id };
  }
}