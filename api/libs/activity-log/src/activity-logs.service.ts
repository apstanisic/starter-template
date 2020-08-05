import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLogMetadata } from './activity-log-metadata';
import { ActivityLog } from './activity-log.entity';
import { WithId } from '@core/common';
import { BaseFindService } from '@core/db';

interface GenerateLogParams<T> {
  oldValue?: T;
  meta: ActivityLogMetadata;
}

@Injectable()
export class ActivityLogsService<Entity extends WithId = any> extends BaseFindService<ActivityLog> {
  constructor(@InjectRepository(ActivityLog) repository: Repository<ActivityLog>) {
    super(repository);
  }

  /**
   * Initialize log. This will create log entity, and fill some fields.
   * @warning This will not save log in database. This only creates instance.
   * You must use store for persisting in db.
   * @TODO Check if user as any is okay
   */
  generateLog({ oldValue, meta }: GenerateLogParams<Entity>): ActivityLog<Entity> {
    const { domain, user, reason } = meta;
    const log = new ActivityLog<Entity>(oldValue);
    log.domainId = typeof domain === 'object' ? domain.id : domain;
    log.executedBy = user as any;
    log.reason = reason;

    return log;
  }

  /** Save provided log to database */
  async store(log: ActivityLog, action: string, newValue?: Entity): Promise<ActivityLog> {
    log.action = action;
    log.newValue = newValue;
    return this.repository.save(log);
  }
}
