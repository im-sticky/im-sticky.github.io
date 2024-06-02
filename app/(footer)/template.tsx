'use client';

import {GoogleAnalytics, usePageViews} from 'nextjs-google-analytics';
import {Layout} from '@components/Layout';
import dynamic from 'next/dynamic';

const CardSeerImport = dynamic(() => import('../../components/CardSeer'), {ssr: false});

export default function Template({children}: {children: React.ReactNode}) {
  usePageViews();

  return (
    <Layout>
      <GoogleAnalytics />
      {children}
      <CardSeerImport />
    </Layout>
  );
}
