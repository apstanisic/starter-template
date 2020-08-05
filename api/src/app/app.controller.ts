import { Controller, Get, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { SeedUsersTable1592697234870 } from 'db/1592697234870-seed_users_table';
import { Connection } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV } from '@core/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private connection: Connection,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * Run seed migrations
   * I can't run yarn typeorm migration:run because of nest libraries
   */
  @Get('migrations')
  async migration(): Promise<any> {
    const env = this.configService.get(NODE_ENV);
    if (env === 'production' || env === 'prod') throw new NotFoundException();

    const queryRunner = this.connection.createQueryRunner();
    // Users seed
    await new SeedUsersTable1592697234870().up(queryRunner);

    return {
      message: 'Success',
    };
  }
}
