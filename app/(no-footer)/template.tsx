'use client';

import {GoogleAnalytics, usePageViews} from 'nextjs-google-analytics';
import {Layout} from '@components/Layout';

export default function Template({children}: {children: React.ReactNode}) {
  usePageViews();

  return (
    <Layout includeFooter={false}>
      <GoogleAnalytics />
      {children}
    </Layout>
  );
}
