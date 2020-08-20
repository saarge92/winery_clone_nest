/**
 * Interface for business logic of RoleService class
 */
import { Role } from '../../entities/role.entity';

export interface IRoleService {
  addUserToRole(name: string, id: string);

  getRolesOfUser(idUser: string);
}