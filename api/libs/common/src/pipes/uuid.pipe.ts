import { ParseUUIDPipe } from '@nestjs/common';

/**
 * Check if value is valid UUID v4
 */
export const ValidUUID = new ParseUUIDPipe({ version: '4' });
