import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { random } from 'faker';
import * as moment from 'moment';
import { Column, Index } from 'typeorm';
import { IUser } from './user.interface';
import { UuidEntity, Image } from '@core/db';

export class BaseUser extends UuidEntity implements IUser {
  /** User Email, has to be unique and to be valid email */
  @Column()
  @Index({ unique: true })
  @IsEmail()
  email: string;

  /** User's password (hashed) */
  @Column()
  @IsString()
  @Exclude()
  password: string;

  /** User real name */
  @Column()
  @IsString()
  @Length(2, 100)
  name: string;

  /** User's profile picture */
  @Column({ nullable: true, type: 'simple-json' })
  @IsOptional()
  avatar?: Image;

  /** Did user confirm his account */
  @Column({ default: false })
  @Exclude()
  confirmed: boolean;

  /** Can be used to confirm user, reset password, change email, etc... */
  @Column({ nullable: true })
  @Exclude()
  token?: string;

  /** Time when secureToken was created. Duration depends on action, and is not stored in db */
  @Column({ nullable: true, precision: 3 })
  @Exclude()
  tokenCreatedAt?: Date;

  /** Set new password and hash it automatically */
  @Exclude()
  async setPassword(newPassword: string): Promise<void> {
    if (newPassword.length > 50) throw new BadRequestException('Password is to long');
    this.password = await bcrypt.hash(newPassword, 12);
  }

  /** Check if provided password is valid */
  checkPassword(enteredPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this.password);
  }

  /**
   * Generate secure token (for accont confirm, reset password...)
   * @param prepend String to be prepended to random UUID.
   * Can be used to carry small amount of data.
   */
  generateSecureToken(prepend = ''): string {
    this.token = `${prepend}___${random.uuid()}`;
    this.tokenCreatedAt = new Date();
    return this.token;
  }

  /** Call this method after token is used */
  removeSecureToken(): void {
    this.token = undefined;
    this.tokenCreatedAt = undefined;
  }

  /** Check if provided token is valid. Max duration is 1 year */
  validToken(token: string, duration: moment.Duration = moment.duration(1, 'year')): boolean {
    if (!this.token) return false;
    if (!this.tokenCreatedAt) return false;
    if (this.token !== token) return false;

    const expired = moment(this.createdAt)
      .add(duration)
      .isBefore(moment());
    if (expired) return false;

    return true;
  }
}
