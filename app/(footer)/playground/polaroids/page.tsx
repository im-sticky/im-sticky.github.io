import React from 'react';
import clsx from 'clsx';
import {Metadata} from 'next';
import {openGraphMeta} from '@helpers/openGraphMeta';
import {Section} from '@components/Section';
import {Container} from '@components/Container';
import {InternalLink} from '@components/InternalLink';
import {TitleShape} from '@components/TitleShape';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeftLong, faBicycle} from '@fortawesome/free-solid-svg-icons';
import {Polaroid} from '@components/Polaroid';
import sharedStyles from '@styles/shared.module.scss';
import styles from './index.module.scss';

export const metadata: Metadata = {
  title: 'Polaroids',
  description: 'React component for displaying marked up images as if they were a polaroid',
  openGraph: openGraphMeta('/playground/polaroids'),
};

export default function Polaroids() {
  return (
    <Section grow className={styles.polaroids}>
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

        <TitleShape icon={faBicycle}>Polaroids</TitleShape>

        <p className={sharedStyles['page__descriptor']}></p>
      </Container>

      <Container className={styles['polaroid-container']}>
        <Polaroid
          imagePath="summer-game-reviews/alan-wake-payphone.jpg"
          caption="Alan on the phone"
        />

        <Polaroid imagePath="spring-game-reviews/celeste-64-world.jpg" />

        <Polaroid
          imagePath="spring-game-reviews/journey-small.jpg"
          caption="Collapses to image size"
        />
      </Container>
    </Section>
  );
}
