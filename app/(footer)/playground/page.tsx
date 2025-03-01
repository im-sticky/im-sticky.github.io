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
import {Folder} from '@components/Folder';
import {FolderColor, TabLocation} from '@components/Folder/enums';
import sharedStyles from '@styles/shared.module.scss';
import styles from './index.module.scss';
import {Polaroid} from '@components/Polaroid';

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Random stuff for testing and playing around with',
  openGraph: openGraphMeta('/playground'),
};

export default function Playground() {
  return (
    <Section grow className={styles.playground}>
      <Container>
        <p
          className={clsx(
            sharedStyles['page__descriptor'],
            sharedStyles['page__descriptor--small'],
            sharedStyles['page__descriptor--spaced']
          )}
        >
          <InternalLink icon to="/">
            <FontAwesomeIcon icon={faArrowLeftLong} className={sharedStyles['page__back-icon']} />
            Back to about
          </InternalLink>
        </p>

        <TitleShape icon={faBicycle}>Playground</TitleShape>

        <p className={sharedStyles['page__descriptor']}>
          Random stuff for testing and playing around with
        </p>
      </Container>

      <Container>
        <Folder tabLocation={TabLocation.Left} title="Exhibit A" subTitle="Evidence of contact">
          <Polaroid
            imagePath="summer-game-reviews/alan-wake-payphone.jpg"
            caption="Alan on the phone"
          />
          <Polaroid
            imagePath="summer-game-reviews/alan-wake-projector.png"
            caption="Alan finds a reel of himself"
          />
        </Folder>

        <Folder tabLocation={TabLocation.Right} color={FolderColor.Red} title="A different colour">
          <img src="/assets/summer-game-reviews/alan-wake-2-ratings.png" alt="" />
        </Folder>

        <Folder
          tabLocation={TabLocation.Left}
          color={FolderColor.Green}
          title="There can be anything in here"
        >
          <iframe src="/blog" height="600" width="600" title="Example"></iframe>
        </Folder>
      </Container>
    </Section>
  );
}
