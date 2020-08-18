import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from '../dto/register_user.dto';
import { LoginUserDto } from '../dto/login_user.dto';
import { compare } from 'bcrypt';
import { IUserService } from '../interfaces/user_service.interface';
import { ROLE_SERVICE, USER_SERVICE } from '../constants/auth.constants';
import { IAuthService } from '../interfaces/auth_service.interface';
import { IRoleService } from '../interfaces/role_service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../entities/role.entity';
import { Repository } from 'typeorm/index';
import { IAuthUserResponse } from '../responses/user_auth.response';

/**
 * Service for authorization/authentication users in our system
 * @author Serdar Durdyev
 */
@Injectable()
export class AuthService implements IAuthService {

  constructor(private readonly jwtService: JwtService,
              @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
              @Inject(USER_SERVICE) private readonly userService: IUserService,
              @Inject(ROLE_SERVICE) private readonly roleService: IRoleService) {
  }

  /**
   * Register user & create user in our system
   * @param userRegisterDto Data object about user
   * @return {Promise<any>} Returns token & user data
   */
  public async registerUser(userRegisterDto: UserRegisterDto): Promise<IAuthUserResponse> {
    const userRoleExist = await this.roleRepository.findOne({ name: 'User' });
    if (!userRoleExist)
      throw new ConflictException('Невозможно добавить вам права пользователя. Обратитесь к администратору');

    const createdUser = await this.userService.createUser(userRegisterDto);
    await this.roleService.addUserToRole('User', createdUser.id);

    const token = await this.jwtService.signAsync({ user: createdUser.email, name: createdUser.name });

    let roles = await this.roleService.getRolesOfUser(createdUser.id);
    if (roles) roles = roles.map(role => role.name);

    return {
      email: createdUser.email,
      name: createdUser.name,
      roles,
      token,
    };
  }

  /**
   * Login user in our system
   * @param loginDto Data object about user
   */
  public async loginUser(loginDto: LoginUserDto): Promise<IAuthUserResponse> {
    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user)
      throw new ConflictException('Неправильный логин или пароль');

    const passportEquals = await compare(loginDto.password, user.password);
    if (!passportEquals)
      throw new ConflictException('Неправильный логин или пароль');

    const token = await this.jwtService.signAsync({ user: user.email, name: user.name });
    let roles = await this.roleService.getRolesOfUser(user.id);
    if (roles) roles = roles.map(role => role.name);

    return {
      email: user.email,
      name: user.name,
      token,
      roles,
    };
  }
}