import 'normalize.css/normalize.css';
import 'styles/globals.scss';
import 'styles/grid.scss';
import {GoogleAnalytics, usePageViews} from 'nextjs-google-analytics';
import {Layout} from 'components/Layout';

import dynamic from 'next/dynamic';

const CardSeerImport = dynamic(() => import('../components/CardSeer'), {ssr: false});

function PortfolioApp({Component, pageProps}) {
  usePageViews();

  return (
    <Layout includeFooter={pageProps.includeFooter}>
      <GoogleAnalytics />
      <Component {...pageProps} />
      <CardSeerImport />
    </Layout>
  );
}

export default PortfolioApp;
