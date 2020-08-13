import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserRegisterDto } from '../dto/register_user.dto';

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {
  }

  public async registerUser(userRegisterDto: UserRegisterDto): Promise<any> {
    const createdUser = await this.userService.createUser(userRegisterDto);
    const token = await this.jwtService.signAsync({ user: createdUser.email, name: createdUser.name });
    return {
      email: createdUser.email,
      name: createdUser.name,
      token,
    };
  }
}