import { DB_LOGGER_SERVICE } from '@core/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLog } from './activity-log.entity';
import { ActivityLogsService } from './activity-logs.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityLog])],
  providers: [ActivityLogsService, { provide: DB_LOGGER_SERVICE, useClass: ActivityLogsService }],
  exports: [ActivityLogsService, { provide: DB_LOGGER_SERVICE, useClass: ActivityLogsService }],
})
export class ActivityLogModule {}
