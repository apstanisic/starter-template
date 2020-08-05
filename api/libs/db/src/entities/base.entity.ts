import { IdType, WithId } from '@core/common';
import { Exclude } from 'class-transformer';
import { CreateDateColumn, Index, UpdateDateColumn } from 'typeorm';
import { validateEntity } from './validate-entity';

/**
 * All entities should extend this class. It has basic properties
 * and methods. There should be a specific reason to not extend this class
 * It has combined index for createdAt and id to improve pagination
 */
export abstract class CoreEntity implements WithId {
  /** Unique Id */
  @Index()
  id: IdType;

  /** Date when entity was updated */
  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  /** Date when entity was created. It has index for cursor pagination */
  @CreateDateColumn()
  @Index()
  createdAt: Date;

  /**
   * All entities will be auto validated before inserting or updating.
   * Exclude private fields when returning errors.
   */
  // @BeforeInsert()
  // @BeforeUpdate()
  async validate(): Promise<void> {
    await validateEntity(this);
  }
}
