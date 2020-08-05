import { Global, Module } from '@nestjs/common';
import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';

@Global()
@Module({
  imports: [],
  providers: [PasswordResetService],
  controllers: [PasswordResetController],
})
export class AuthPasswordResetModule {}
