import { IRoleService } from '../interfaces/role_service.interface';
import { UserRole } from '../../entities/user_role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../entities/role.entity';
import { In, Repository } from 'typeorm/index';
import { ConflictException } from '@nestjs/common';
import { User } from '../../entities/user.entity';

export class RoleService implements IRoleService {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>,
              @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>,
              @InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  /**
   * Add user to role
   * @param name Name of role
   * @param userId Id of user
   * @return {Promise<UserRole>} Returns asynchronously created record about users & roles
   */
  public async addUserToRole(name: string, userId: string): Promise<UserRole> {
    const role = await this.roleRepository.findOne({ name });
    if (!role)
      throw new ConflictException('Роль с таким названием не найдена');

    const user = await this.userRepository.findOne(userId);
    if (!user)
      throw new ConflictException('Пользователь с таким Id не найден');

    const createdUserInRoleRecord = new UserRole();
    createdUserInRoleRecord.role_id = role.id;
    createdUserInRoleRecord.user_id = user.id;

    await this.userRoleRepository.save(createdUserInRoleRecord);
    return createdUserInRoleRecord;
  }

  /**
   * Get roles of user by user id
   * @param idUser Id of searching user
   * @return {Promise<Role[]>} Returns asynchronously list of roles
   */
  public async getRolesOfUser(idUser: string): Promise<Role[]> {
    const listOfRelations = await this.userRoleRepository.find({ where: { user_id: idUser } });
    if (listOfRelations.length > 0) {
      const rolesId = listOfRelations.map(relation => relation.role_id);
      return await this.roleRepository.find({ where: { id: In([...rolesId]) } });
    }
    return null;
  }
}