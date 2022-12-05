import React from 'react';
import Head from 'next/head';
import {SITE_URL} from 'helpers/constants';

export function PageHead({title, description, url, image = '/mstile-144x144.png', children}) {
  return (
    <Head>
      <title>Alex Craig | {title}</title>

      <meta property="og:site_name" content="Alex Craig's Portfolio" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE_URL}/${url}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />

      <meta name="twitter:site" content="@im_sticky" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={`${SITE_URL}/${url}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${image}`} />

      {children}
    </Head>
  );
}
