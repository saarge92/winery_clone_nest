import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserRegisterDto } from '../dto/register_user.dto';

@Controller('/user')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/register')
  public async registerUser(@Body()userRegister: UserRegisterDto) {
    return await this.authService.registerUser(userRegister);
  }
}