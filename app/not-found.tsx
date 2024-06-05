'use client';

import {GoogleAnalytics, usePageViews} from 'nextjs-google-analytics';
import {Layout} from '@components/Layout';
import {Section} from '@components/Section';
import {Container} from '@components/Container';
import {InternalLink} from '@components/InternalLink';
import styles from './not-found.module.scss';

export default function NotFound() {
  usePageViews();

  return (
    <Layout>
      <GoogleAnalytics />
      <Section grow className={styles['not-found']}>
        <Container>
          <h1 className={styles['not-found__title']}>404</h1>
          <p className={styles['not-found__text']}>This page does not exist</p>
          <InternalLink to="/" className={styles['not-found__back']}>
            Home
          </InternalLink>
        </Container>
      </Section>
    </Layout>
  );
}
