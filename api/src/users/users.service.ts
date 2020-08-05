import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { BaseUserService } from '@core/auth/users/base-user.service';

@Injectable()
export class UsersService extends BaseUserService<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository, { useRoles: false });
  }
}
