import { UserRegisterDto } from '../dto/register_user.dto';
import { LoginUserDto } from '../dto/login_user.dto';
import { IAuthUserResponse } from '../responses/user_auth.response';

/**
 * Interface defining the business logic
 * for AuthService class, which contains basic function for authentication
 *
 * @author Serdar Durdyev
 */
export interface IAuthService {
  registerUser(userRegisterDto: UserRegisterDto): Promise<IAuthUserResponse>;

  loginUser(loginDto: LoginUserDto): Promise<IAuthUserResponse>;
}