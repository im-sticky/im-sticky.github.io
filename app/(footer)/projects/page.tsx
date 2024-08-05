import React from 'react';
import clsx from 'clsx';
import {Metadata} from 'next';
import {Project} from '@models/project';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeftLong, faCodeBranch, faHatWizard} from '@fortawesome/free-solid-svg-icons';
import {TitleShape} from '@components/TitleShape';
import {Section} from '@components/Section';
import {Container} from '@components/Container';
import {InternalLink} from '@components/InternalLink';
import {ExternalLink} from '@components/ExternalLink';
import {openGraphMeta} from '@helpers/openGraphMeta';
import sharedStyles from '@styles/shared.module.scss';
import styles from './index.module.scss';

export const metadata: Metadata = {
  title: 'Projects',
  description: "List of some of Alex Craig's Projects and various hobby related things",
  openGraph: openGraphMeta('/projects'),
};

export default function Projects() {
  const projects = getProjects();
  const hobbies = getHobbies();

  return (
    <Section grow className={styles.projects}>
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

        <TitleShape icon={faCodeBranch}>Projects</TitleShape>

        <p className={sharedStyles['page__descriptor']}>
          Some of my personal projects and experiments
        </p>

        <div className={styles.projects__list}>
          {projects.map((project) => (
            <div
              key={project.link}
              className={clsx(styles.project, {[styles['project--with-image']]: project.image})}
            >
              {project.image ? (
                <img src={project.image} className={styles.project__image} alt="" />
              ) : null}
              <div className={styles.project__content}>
                <h3 className={styles.project__title}>
                  {project.external ? (
                    <ExternalLink href={project.link}>{project.title}</ExternalLink>
                  ) : (
                    <InternalLink to={project.link}>{project.title}</InternalLink>
                  )}
                </h3>
                <p className={styles.project__description}>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container className={styles.hobbies}>
        <TitleShape icon={faHatWizard}>Hobbies</TitleShape>
        <p className={sharedStyles['page__descriptor']}>A small insight into some of my hobbies</p>

        <div className={styles.projects__list}>
          {hobbies.map((hobby) => (
            <div
              key={hobby.link}
              className={clsx(styles.project, {[styles['project--with-image']]: hobby.image})}
            >
              {hobby.image ? (
                <img src={hobby.image} className={styles.project__image} alt="" />
              ) : null}
              <div className={styles.project__content}>
                <h3 className={styles.project__title}>
                  {hobby.external ? (
                    <ExternalLink href={hobby.link}>{hobby.title}</ExternalLink>
                  ) : (
                    <InternalLink to={hobby.link}>{hobby.title}</InternalLink>
                  )}
                </h3>
                <p className={styles.project__description}>{hobby.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function getProjects() {
  return [
    new Project({
      title: 'Game Rater',
      description:
        'A small website for creating bite-sized video game ratings to share online with friends and followers.',
      link: 'https://gamerater.vercel.app/',
      external: true,
      image: '/projects/gamerater.jpg',
    }),
    new Project({
      title: 'MTG Card Seer',
      description: 'Web Components for previewing MTG card images and deck lists automatically.',
      link: 'https://github.com/im-sticky/mtg-card-seer#readme',
      external: true,
      image: '/projects/cardseer.jpg',
    }),
    new Project({
      title: 'CRT.tv',
      description: 'An interactable CRT that displays some of my game clips on different channels.',
      link: '/crt-tv',
      image: '/projects/crt.jpg',
    }),
    new Project({
      title: 'PICO-8 Carts',
      description: 'A collection of PICO-8 games and concept carts I have made.',
      link: 'https://www.lexaloffle.com/bbs/?uid=59846&mode=carts&sub=0#m',
      external: true,
      image: '/projects/pico-8.jpg',
    }),
    new Project({
      title: 'React Music Visualizer',
      description: 'Flexible React component for displaying waveform audio visualizations.',
      link: 'https://github.com/im-sticky/react-music-visualizer#readme',
      external: true,
      image: '/projects/visualizer.jpg',
    }),
  ].map((x) => x.toJSON());
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
