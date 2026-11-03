import React from 'react';
import clsx from 'clsx';
import {Metadata} from 'next';
import {openGraphMeta} from '@helpers/openGraphMeta';
import {Section} from '@components/Section';
import {Container} from '@components/Container';
import {InternalLink} from '@components/InternalLink';
import {TitleShape} from '@components/TitleShape';
import {GyroscopeDisplay} from '@components/GyroscopeDisplay';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeftLong, faBicycle} from '@fortawesome/free-solid-svg-icons';
import sharedStyles from '@styles/shared.module.scss';
import styles from './index.module.scss';

export const metadata: Metadata = {
  title: 'Gyroscope',
  description: 'Simple test for working with a devices gyroscope to control something on the page',
  openGraph: openGraphMeta('/playground/gyroscope'),
};

export default function Gyroscope() {
  return (
    <Section grow className={styles.gyroscope}>
      <Container>
        <p
          className={clsx(
            sharedStyles['page__descriptor'],
            sharedStyles['page__descriptor--small'],
            sharedStyles['page__descriptor--spaced'],
          )}
        >
          <InternalLink icon to="/playground">
            <FontAwesomeIcon icon={faArrowLeftLong} className={sharedStyles['page__back-icon']} />
            Back to playground
          </InternalLink>
        </p>

        <TitleShape icon={faBicycle}>Gyroscope</TitleShape>

        <p className={sharedStyles['page__descriptor']}>
          Simple test for working with a devices gyroscope to control something on the page
        </p>
      </Container>

      <Container className={styles['gyroscope-container']}>
        <GyroscopeDisplay />
      </Container>
    </Section>
  );
}
