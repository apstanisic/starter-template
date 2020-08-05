import { GetUser } from '@core/auth/auth/get-user.decorator';
import { JwtGuard } from '@core/auth/auth/jwt-guard';
import { BaseUser } from '@core/auth/users/base-user.entity';
import { UUID, ValidUUID } from '@core/common';
import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { Role } from './roles.entity';
import { RolesService } from './roles.service';

/**
 * Get roles for given user
 * User can only delete his roles. He can't create them
 */
@Controller('auth/account/roles')
export class RolesController<User extends BaseUser = BaseUser> {
  constructor(private readonly rolesService: RolesService) {}

  @Get('')
  @UseGuards(JwtGuard)
  getUsersRoles(@GetUser() user: User): Promise<Role[]> {
    return this.rolesService.find({ userId: user.id });
  }

  /** Delete user role */
  @Delete(':roleId')
  @UseGuards(JwtGuard)
  deleteRole(@Param('roleId', ValidUUID) id: UUID, @GetUser() user: User): Promise<Role> {
    return this.rolesService.deleteWhere({ user, id });
  }
}
