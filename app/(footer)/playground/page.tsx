import React from 'react';
import clsx from 'clsx';
import {Metadata} from 'next';
import {openGraphMeta} from '@helpers/openGraphMeta';
import {Project} from '@models/project';
import {Section} from '@components/Section';
import {Container} from '@components/Container';
import {InternalLink} from '@components/InternalLink';
import {ExternalLink} from '@components/ExternalLink';
import {TitleShape} from '@components/TitleShape';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeftLong, faBicycle, faHatWizard} from '@fortawesome/free-solid-svg-icons';
import sharedStyles from '@styles/shared.module.scss';
import styles from './index.module.scss';

export const metadata: Metadata = {
  title: 'Playground',
  description: 'A place for smaller one off experiments',
  openGraph: openGraphMeta('/playground'),
};

export default function Playground() {
  const playground = getPlayground();
  const hobbies = getHobbies();

  return (
    <Section grow className={styles.playground}>
      <Container>
        <p
          className={clsx(
            sharedStyles['page__descriptor'],
            sharedStyles['page__descriptor--small'],
            sharedStyles['page__descriptor--spaced'],
          )}
        >
          <InternalLink icon to="/">
            <FontAwesomeIcon icon={faArrowLeftLong} className={sharedStyles['page__back-icon']} />
            Back to about
          </InternalLink>
        </p>

        <TitleShape icon={faBicycle}>Playground</TitleShape>

        <p className={sharedStyles['page__descriptor']}>A place for smaller one off experiments</p>
      </Container>

      <Container className={styles['tall-container']}>
        <div className={styles.items__list}>
          {playground.map((item) => (
            <div key={item.link} className={styles.item}>
              <div className={styles.item__content}>
                <h3 className={styles.item__title}>
                  {item.external ? (
                    <ExternalLink href={item.link}>{item.title}</ExternalLink>
                  ) : (
                    <InternalLink to={item.link}>{item.title}</InternalLink>
                  )}
                </h3>
                <p className={styles.item__description}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container className={styles.items}>
        <TitleShape icon={faHatWizard}>Hobbies</TitleShape>
        <p className={sharedStyles['page__descriptor']}>Some insight into some of my hobbies</p>

        <div className={styles.items__list}>
          {hobbies.map((hobby) => (
            <div key={hobby.link} className={styles.item}>
              <div className={styles.item__content}>
                <h3 className={styles.item__title}>
                  {hobby.external ? (
                    <ExternalLink href={hobby.link}>{hobby.title}</ExternalLink>
                  ) : (
                    <InternalLink to={hobby.link}>{hobby.title}</InternalLink>
                  )}
                </h3>
                <p className={styles.item__description}>{hobby.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function getHobbies() {
  return [
    new Project({
      title: 'Elder Dragon Highlander',
      description: 'The cards and stories that make up my lifelong EDH deck.',
      link: '/edh',
      external: false,
    }),
    new Project({
      title: 'Speedrun Records',
      description: 'Personal best times and recordings for games I speedrun.',
      link: 'https://www.speedrun.com/users/im_sticky',
      external: true,
    }),
    new Project({
      title: 'MTG Arena',
      description: "Recent decks and info of what I'm playing in MTG Arena.",
      link: 'https://mtga.untapped.gg/profile/2d328316-0ac0-46cf-99e7-b2878d557c24/DA7A60C48631490D?timeFrame=last_two_sets',
      external: true,
    }),
  ];
}

function getPlayground() {
  return [
    new Project({
      title: 'File Folders',
      description:
        'React component for CSS forward file folders styled like the colourful ones you would find in an elementary school.',
      link: '/playground/file-folders',
      external: false,
    }),
    new Project({
      title: 'Polaroids',
      description: 'React component for displaying marked up images as if they were a polaroid.',
      link: '/playground/polaroids',
      external: false,
    }),
  ];
}
