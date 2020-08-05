import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Validator, isUUID } from 'class-validator';
import { UUID } from '../types';

/**
 * Get many UUIDs from JSON
 * @example
 * method(@Query('ids', ManyUUID) ids: UUID[]) {}
 */
@Injectable()
export class ManyUUID implements PipeTransform<string, UUID[]> {
  transform(value: any): UUID[] {
    let ids;
    try {
      ids = JSON.parse(value);
    } catch (error) {
      throw new BadRequestException();
    }

    if (!Array.isArray(ids)) throw new BadRequestException();

    const valid = ids.every(id => isUUID(id));
    if (!valid) throw new BadRequestException('Invalid ids');

    return ids;
  }
}
