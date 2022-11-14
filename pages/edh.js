import React, {useEffect, useRef} from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import {serialize} from 'next-mdx-remote/serialize';
import {MDXRemote} from 'next-mdx-remote';
import {getPost} from 'helpers/postUtils.mjs';
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

const mdxComponents = {ExternalLink, Figure};

export default function Edh({source, frontMatter}) {
  const heroScrollTarget = 700;
  const heroScreenRef = useRef();
  const heroImageRef = useRef();

  const adjustHeroPosition = () => {
    if (heroScreenRef.current && heroImageRef.current) {
      const position = Math.min((window.pageYOffset / heroScrollTarget) * 100, 100);

      heroScreenRef.current.style.backgroundImage = `linear-gradient(to left, rgb(250, 250, 250) ${position}%, rgba(250, 250, 250, 0) ${
        position + 25
      }%, rgba(250, 250, 250, 0))`;
      heroImageRef.current.style.objectPosition = `50% ${position}%`;
    }
  };

  useEffect(() => {
    adjustHeroPosition();
    window.addEventListener('scroll', adjustHeroPosition);
  }, []);

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
        <div className={styles['edh__hero-splash']}>
          <img
            className={styles['edh__hero-image']}
            src={'/edh/hero.jpg'}
            role="presentation"
            ref={heroImageRef}
          />
          <div className={styles['edh__hero-screen']} ref={heroScreenRef} />
        </div>

        <div className={styles.edh__hero}>
          <div className={styles['edh__hero-container']}>
            <TitleShape icon={faDragon}>{frontMatter.title}</TitleShape>
            <p className={sharedStyles['page__descriptor']}>{frontMatter.description}</p>
          </div>
        </div>

        <Container>
          <MDXRemote {...source} components={mdxComponents} />
        </Container>
      </Section>
    </>
  );
}

export const getStaticProps = async (context) => {
  const {content, data} = getPost('edh');

  const mdxSource = await serialize(content);

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};
