import { IRoleService } from '../interfaces/role_service.interface';
import { UserRole } from '../../entities/user_role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../entities/role.entity';
import { Repository } from 'typeorm/index';
import { ConflictException } from '@nestjs/common';
import { User } from '../../entities/user.entity';

export class RoleService implements IRoleService {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>,
              @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>,
              @InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  public async addUserToRole(name: string, id: string): Promise<UserRole> {
    const role = await this.roleRepository.findOne({ name });
    if (!role)
      throw new ConflictException('Роль с таким названием не найдена');

    const user = await this.userRepository.findOne(id);
    if (!user)
      throw new ConflictException('Пользователь с таким Id не найден');

    const createdUserInRoleRecord = new UserRole();
    createdUserInRoleRecord.role_id = role.id;
    createdUserInRoleRecord.user_id = user.id;

    await this.userRoleRepository.save(createdUserInRoleRecord);
    return createdUserInRoleRecord;
  }

}