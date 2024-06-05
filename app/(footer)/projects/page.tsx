import React from 'react';
import clsx from 'clsx';
import {Metadata} from 'next';
import {Project} from '@models/project';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeftLong, faCodeBranch} from '@fortawesome/free-solid-svg-icons';
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
  description: "List of some of Alex Craig's Projects",
  openGraph: openGraphMeta('/projects'),
};

export default function Projects() {
  const projects = getProjects();

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
            <div key={project.link} className={styles.project}>
              <img src={project.image} className={styles.project__image} alt="" />
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
      link: '/pico-8',
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
