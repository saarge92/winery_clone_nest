import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_SERVICE } from '../constants/auth.constants';
import { IRoleService } from '../interfaces/role_service.interface';

/**
 * Http-filter for role guard
 * Only specified roles can activate certain http methods
 * @author Serdar Durdyev
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector,
              @Inject(ROLE_SERVICE) private readonly roleService: IRoleService) {
  }

  /**
   * Logic of permission roles guard
   * @param context Http context of execution request
   */
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return false;

    const request = context.switchToHttp().getRequest();
    const userData: any = request.user;

    const userRoles = (await this.roleService.getRolesOfUser(userData.id)).map(role => role.name);
    const hasRoles = roles.some((role) => userRoles.includes(role));
    if (!hasRoles)
      throw new ForbiddenException('Отсутсвие прав на создание производителя в системе');

    return hasRoles;
  }

}