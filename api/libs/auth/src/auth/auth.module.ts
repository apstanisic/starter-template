import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthEmailModule } from '../auth-email/auth-email.module';
import { AuthPasswordResetModule } from '../auth-password-reset/password-reset.module';
import { AuthSessionsModule } from '../auth-sessions/auth-sessions.module';
import { AuthUsersModule } from '../auth-users/auth-users.module';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthSessionsModule,
    AuthEmailModule,
    AuthPasswordResetModule,
    AuthUsersModule,
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
