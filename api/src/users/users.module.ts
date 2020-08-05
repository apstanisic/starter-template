import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { USER_SERVICE } from '@core/common';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  exports: [UsersService, { provide: USER_SERVICE, useClass: UsersService }],
  providers: [UsersService, { provide: USER_SERVICE, useClass: UsersService }],
})
export class UserModule {}
