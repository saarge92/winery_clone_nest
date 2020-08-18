/**
 * Interface for business logic of RoleService class
 */
export interface IRoleService {
  addUserToRole(name: string, id: string);

  getRolesOfUser(idUser: string);
}