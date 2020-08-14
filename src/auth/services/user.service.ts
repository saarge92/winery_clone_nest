import { ConflictException, Injectable } from '@nestjs/common';
import { UserRegisterDto } from '../dto/register_user.dto';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { hash } from 'bcrypt';
import { IUserService } from '../interfaces/user_service.interface';

/**
 * Service for users business logic
 * @author Serdar Durdyev
 */
@Injectable()
export class UserService implements IUserService {
  private readonly salt = 10;

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  /**
   * Create user in our system
   * @param userRegisterDto Users data
   */
  public async createUser(userRegisterDto: UserRegisterDto): Promise<User> {
    const existedUser = await this.userRepository.findOne({ email: userRegisterDto.email });
    if (existedUser)
      throw new ConflictException('Пользователь уже существует');
    return await this.initUserFromDto(userRegisterDto);
  }

  /**
   * Initialize user from data transfer ojbect
   * @param userRegisterDto Data about users creations
   * @return {Promise<User>} Returns asynchronously data about created user
   */
  private async initUserFromDto(userRegisterDto: UserRegisterDto): Promise<User> {
    const newUser = new User();
    newUser.email = userRegisterDto.email;
    newUser.name = userRegisterDto.name;
    newUser.password = await hash(userRegisterDto.password, this.salt);
    await this.userRepository.save(newUser);
    return newUser;
  }

  /**
   * Check if user exists in our system
   * @param email Email of searching user
   */
  public async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ email });
  }
}