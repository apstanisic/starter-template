import { USER_SERVICE, ValidEmail } from '@core/common';
import { BaseService } from '@core/db';
import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { IsUUID, Length } from 'class-validator';
import { BaseUser } from '../users/base-user.entity';
import { PasswordResetService } from './password-reset.service';

export class ResetPasswordDto {
  @Length(8, 50)
  password: string;

  @IsUUID()
  token: string;
}

/** Controller for password reseting */
@Controller('forgot-password')
export class PasswordResetController {
  constructor(
    @Inject(USER_SERVICE) private readonly usersService: BaseService<BaseUser>,
    private readonly service: PasswordResetService,
  ) {}

  /**
   * Method that reset the user password and sets it in db.
   * Frontend should call this method. It must be post request.
   */
  @Post('reset')
  async resetPassword(
    @Param('email', ValidEmail) email: string,
    @Body() { password, token }: ResetPasswordDto,
  ): Promise<BaseUser> {
    const user = await this.usersService.findOne({ email });
    return this.service.resetPassword({ user, token, password });
  }

  /**
   * Send email with reset instruction.
   * This is async, but there is no need to wait.
   * User should not know if account with given email exist.
   * Always return success. Even if it throws error, return success.
   */
  @Post(':email')
  async sendPasswordRecoveryMail(
    @Param('email', ValidEmail) email: string,
  ): Promise<{ message: string; success: true }> {
    await this.service.sendResetPasswordEmail(email);
    return { success: true, message: 'Password reset email is sent.' };
  }
}
