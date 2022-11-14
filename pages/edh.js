import React from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import {Section} from 'components/Section';
import {Container} from 'components/Container';
import {InternalLink} from 'components/Link';
import {TitleShape} from 'components/TitleShape';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDragon, faLongArrowAltLeft, faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';
import {ExternalLink} from 'components/Link';
import {Figure} from 'components/Figure';
import {SITE_URL} from 'helpers/constants';
import styles from 'styles/Edh.module.scss';
import sharedStyles from 'styles/Shared.module.scss';

export default function Post({}) {
  return (
    <>
      <Head>
        <title>Alex Craig | EDH</title>

        <meta property="og:site_name" content="Alex Craig's Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/edh`} />
        <meta property="og:title" content="EDH" />
        <meta property="og:description" content="My EDH deck" />
        <meta property="og:image" content="/edh/splash.jpg" />

        <meta name="twitter:site" content="@im_sticky" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={`${SITE_URL}/edh`} />
        <meta name="twitter:title" content="EDH" />
        <meta name="twitter:description" content="My EDH deck" />
        <meta name="twitter:image" content="/edh/splash.jpg" />
      </Head>

      <Section grow id="EDH" className={styles.edh}>
        <div className={styles.edh__hero}>
          <div className={styles['edh__hero-splash']}>
            <img className={styles['edh__hero-image']} src={'/edh/hero.jpg'} role="presentation" />
            <div className={styles['edh__hero-screen']} />
          </div>

          <div className={styles['edh__hero-container']}>
            <TitleShape icon={faDragon}>Lorem ipsum dolar sit amet</TitleShape>
            <p className={sharedStyles['page__descriptor']}>
              Qui est eu tempor cillum minim ut amet labore.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
