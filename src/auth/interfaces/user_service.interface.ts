import { UserRegisterDto } from '../dto/register_user.dto';
import { User } from '../../entities/user.entity';

/**
 * Interface for business logic of UserSevice
 */
export interface IUserService {
  createUser(userRegisterDto: UserRegisterDto): Promise<User>;

  getUserByEmail(email: string): Promise<User | null>
}