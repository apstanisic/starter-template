// import { BaseUser } from '@core/auth/users/base-user.entity';
import { BaseUser } from '../../libs/auth/src/users/base-user.entity';
import { Injectable, SerializeOptions } from '@nestjs/common';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
@SerializeOptions({ enableCircularCheck: true })
@Injectable()
export class User extends BaseUser {
  /** Ads user owns */

  /** User phone number */
  @Column({ nullable: true })
  phoneNumber?: string;
}
