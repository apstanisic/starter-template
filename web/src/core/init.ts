import { auth } from './auth/auth';

/**
 * Enable init only once
 */
let isInited = false;

/**
 * This is "init script"
 */
export async function init(): Promise<void> {
  if (isInited) return;
  await auth.init();
  isInited = true;
}
