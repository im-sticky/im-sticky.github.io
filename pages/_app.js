import 'normalize.css/normalize.css';
import 'styles/globals.scss';
import {Layout} from 'components/Layout';

import dynamic from 'next/dynamic';

const CardSeerImport = dynamic(() => import('../components/CardSeer'), {ssr: false});

function PortfolioApp({Component, pageProps}) {
  return (
    <Layout includeFooter={pageProps.includeFooter}>
      <Component {...pageProps} />
      <CardSeerImport />
    </Layout>
  );
}

export default PortfolioApp;
