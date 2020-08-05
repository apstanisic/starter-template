import { GetUser } from '@core/auth/auth/get-user.decorator';
import { ValidUUID } from '@core/common';
import { IdArrayDto } from '@core/common/id-array.dto';
import { Body, Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('auth')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly service: UsersService) {}

  /** Update user info */
  @Put()
  async updateUserInfo(@Body() updateData: UpdateUserDto, @GetUser() user: User): Promise<User> {
    return this.service.update(user, updateData);
  }

  /** Get many users with provided ids */
  @Get('users/ids')
  async getUsersByIds(@Query() query: IdArrayDto): Promise<{ data: User[] }> {
    const data = await this.service.findByIds(query.ids);
    return { data };
  }

  /** Get general user info by id. Still needs to be logged in for now */
  @Get('users/:id')
  GetUser(@Param('id', ValidUUID) id: string): Promise<User> {
    return this.service.findOne(id);
  }
}
