import { Expose } from 'class-transformer';
import { IdType, UUID } from '@core/common';
import { Image } from '@core/db';

/** User must always have this properties */
export interface IUser extends BasicUserInfo {
  id: IdType;
  name: string;
  email: string;
  phoneNumber?: string;
  avatar?: Image;
  confirmed: boolean;
  secureToken?: string;
  tokenCreatedAt?: Date;
  password: string;
  checkPassword: (password: string) => Promise<boolean> | boolean;
}

/** User will always have this fields when returned. Avatar is optional */
export class BasicUserInfo {
  @Expose()
  id: IdType;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  phoneNumber?: string;
}

export class AuthUser {
  id: UUID;
  email: string;
  name: string;
  phoneNumber?: string;
}
