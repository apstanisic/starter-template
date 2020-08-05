import React from 'react';
import { useRouter } from 'next/router';

/** Returns a method to redirect to 404 page */
export function use404() {
  const router = useRouter();
  return () => {
    router.replace('/404');
    return <span></span>;
  };
}

/**
 * Check if propvided value is undefined.
 * Offten used with use404.
 * Check if value is undefined, if it is, redirect to 404
 */
export function hasValue<T>(val: T | undefined | null): val is T {
  return val !== undefined && val !== null;
}
