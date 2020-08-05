import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { classToClass } from 'class-transformer';
import { WithId } from '@core/common';

/**
 * Validate provided entity
 * @param entity Entity to be validated
 */
export async function validateEntity(entity: WithId): Promise<void> {
  let errors = await validate(entity);

  if (errors.length > 0) {
    errors = errors.map(({ target, ...other }) => ({
      ...other,
      // Remove sensitive data
      target: classToClass(target),
    }));
    throw new BadRequestException(errors);
  }
}
