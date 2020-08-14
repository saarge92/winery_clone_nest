import { UserRegisterDto } from '../dto/register_user.dto';
import { LoginUserDto } from '../dto/login_user.dto';

export interface IAuthService {
  registerUser(userRegisterDto: UserRegisterDto);

  loginUser(loginDto: LoginUserDto)
}