import Head from 'next/head';
import React from 'react';

/**
 * Set page title
 */
export function setTitle(title: string): JSX.Element {
  return (
    <Head>
      <title>{title} | Nadji auto</title>
    </Head>
  );
}
