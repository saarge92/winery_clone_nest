import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { UserRegisterDto } from '../dto/register_user.dto';
import { LoginUserDto } from '../dto/login_user.dto';
import { IAuthService } from '../interfaces/auth_service.interface';
import { AUTH_SERVICE } from '../constants/auth.constants';

@Controller('/user')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly authService: IAuthService) {
  }

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  public async registerUser(@Body()userRegister: UserRegisterDto) {
    return await this.authService.registerUser(userRegister);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public async loginUser(@Body()loginUserDto: LoginUserDto) {
    return await this.authService.loginUser(loginUserDto);
  }
}