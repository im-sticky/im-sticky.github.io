import React from 'react';
import clsx from 'clsx';
import {Section} from 'components/Section';
import {Container} from 'components/Container';
import {InternalLink, ExternalLink} from 'components/Link';
import {TitleShape} from 'components/TitleShape';
import {PageHead} from 'components/PageHead';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLongArrowAltLeft, faCodeBranch} from '@fortawesome/free-solid-svg-icons';
import {Project} from 'models/project';
import styles from 'styles/Projects.module.scss';
import sharedStyles from 'styles/Shared.module.scss';

export default function Projects({projects}) {
  return (
    <>
      <PageHead url="projects" title="Projects" description="Alex Craig's Projects" />

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
              <FontAwesomeIcon
                icon={faLongArrowAltLeft}
                className={sharedStyles['page__back-icon']}
              />
              Back to home
            </InternalLink>
          </p>

          <TitleShape icon={faCodeBranch}>Projects</TitleShape>

          <p className={sharedStyles['page__descriptor']}>
            Some of my personal projects and experiments
          </p>

          <div className={styles.projects__list}>
            {projects.map((project) => {
              const additional = project.external
                ? {
                    target: '_blank',
                    rel: 'nofollow noreferrer noopener',
                  }
                : {};

              return (
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
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}

export const getStaticProps = async () => {
  const projects = [
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
      link: '/crt',
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

  return {props: {projects}};
};
