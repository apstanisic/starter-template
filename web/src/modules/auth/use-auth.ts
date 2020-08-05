import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'src/state/store';
import { useEffect } from 'react';
import { User } from './user-interface';

/**
 * Get auth data.
 * Option to redirect user if he's logged in or is not logged in
 */
export function useAuth(options?: {
  redirectUrl?: string;
  redirectLogged?: boolean;
  redirectUnlogged?: boolean;
}): { user?: User; loggedIn?: boolean } {
  const router = useRouter();
  const { loggedIn, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (loggedIn === true && options?.redirectLogged) {
      router.push(options?.redirectUrl ?? '/');
    }
    if (loggedIn === false && options?.redirectUnlogged) {
      router.push(options?.redirectUrl ?? '/auth/login');
    }
  }, [loggedIn, options, router]);

  return { loggedIn, user };
}
