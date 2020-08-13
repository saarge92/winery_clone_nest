import { ConflictException, Injectable } from '@nestjs/common';
import { UserRegisterDto } from '../dto/register_user.dto';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  private readonly salt = 10;

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  public async createUser(userRegisterDto: UserRegisterDto): Promise<User> {
    const existedUser = await this.userRepository.findOne({ email: userRegisterDto.email });
    if (existedUser)
      throw new ConflictException('Пользователь уже существует');
    return await this.initUserFromDto(userRegisterDto);
  }

  private async initUserFromDto(userRegisterDto: UserRegisterDto): Promise<User> {
    const newUser = new User();
    newUser.email = userRegisterDto.email;
    newUser.name = userRegisterDto.name;
    newUser.password = await hash(userRegisterDto.password, this.salt);
    return newUser;
  }

}