import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from '../dto/register_user.dto';
import { LoginUserDto } from '../dto/login_user.dto';
import { compare } from 'bcrypt';
import { IUserService } from '../interfaces/user_service.interface';
import { USER_SERVICE } from '../constants/auth.constants';
import { IAuthService } from '../interfaces/auth_service.interface';
import { RoleService } from './role.service';

/**
 * Service for authorization/authentication users in our system
 * @author Serdar Durdyev
 */
@Injectable()
export class AuthService implements IAuthService {

  constructor(private readonly jwtService: JwtService,
              @Inject(USER_SERVICE) private readonly userService: IUserService,
              private readonly roleService: RoleService) {
  }

  /**
   * Register user & create user in our system
   * @param userRegisterDto Data object about user
   * @return {Promise<any>} Returns token & user data
   */
  public async registerUser(userRegisterDto: UserRegisterDto): Promise<any> {
    const createdUser = await this.userService.createUser(userRegisterDto);
    await this.roleService.addUserToRole('User', createdUser.id);
    const token = await this.jwtService.signAsync({ user: createdUser.email, name: createdUser.name });
    return {
      email: createdUser.email,
      name: createdUser.name,
      token,
    };
  }

  /**
   * Login user in our system
   * @param loginDto Data object about user
   */
  public async loginUser(loginDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user)
      throw new ConflictException('Неправильный логин или пароль');

    const passportEquals = await compare(loginDto.password, user.password);
    if (!passportEquals)
      throw new ConflictException('Неправильный логин или пароль');

    const token = await this.jwtService.signAsync({ user: user.email, name: user.name });
    return {
      email: user.email,
      name: user.name,
      token,
    };
  }
}