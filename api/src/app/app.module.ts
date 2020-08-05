import { AuthModule, AuthSession } from '@core/auth';
import { DbModule } from '@core/db';
import { MailModule } from '@core/mail';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/users/user.entity';
import { UserModule } from 'src/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DbModule.forRoot({ entities: [User, AuthSession] }),
    MailModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
