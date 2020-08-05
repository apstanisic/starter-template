import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Logger, InternalServerErrorException, DynamicModule } from '@nestjs/common';
import { JWT_SECRET } from '@core/common';

export function initJwtModule(): DynamicModule {
  return JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService): JwtModuleOptions => {
      const secret = configService.get(JWT_SECRET);
      if (!secret) {
        new Logger(JwtModule.name).error('JWT_SECRET not defined');
        throw new InternalServerErrorException();
      }
      // expired in 3 min
      return { secret, signOptions: { expiresIn: 180 } };
    },
  });
}
