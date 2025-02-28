import clsx from 'clsx';
import {Metadata} from 'next';
import {Montserrat, Sulphur_Point, Grape_Nuts} from 'next/font/google';
import {config} from '@fortawesome/fontawesome-svg-core';
import {SITE_URL} from '@helpers/constants';
import {openGraphMeta} from '@helpers/openGraphMeta';
import 'normalize.css/normalize.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@styles/globals.scss';
import '@styles/grid.scss';

config.autoAddCss = false;

const montserrat = Montserrat({subsets: ['latin'], display: 'swap'});
const sulphurPoint = Sulphur_Point({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sulphur-point',
});

const grapeNuts = Grape_Nuts({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grape-nuts',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Alex Craig',
    default: 'About',
  },
  description: 'Personal website of Alex Craig.',
  openGraph: openGraphMeta(),
  twitter: {
    site: '@im_sticky',
    card: 'summary',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={clsx(montserrat.className, sulphurPoint.variable, grapeNuts.variable)}
    >
      <body>{children}</body>
    </html>
  );
}

export const dynamic = 'force-static';
