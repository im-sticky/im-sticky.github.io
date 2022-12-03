import React from 'react';
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
import {VerticalHero} from 'components/VerticalHero';
import {SITE_URL} from 'helpers/constants';
import styles from 'styles/Edh.module.scss';
import sharedStyles from 'styles/Shared.module.scss';

const mdxComponents = {ExternalLink, Figure};

export default function Edh({source, frontMatter}) {
  return (
    <>
      <Head>
        <title>Alex Craig | EDH</title>

        <meta property="og:site_name" content="Alex Craig's Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/edh`} />
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={frontMatter.description} />
        <meta property="og:image" content="/edh/splash.jpg" />

        <meta name="twitter:site" content="@im_sticky" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={`${SITE_URL}/edh`} />
        <meta name="twitter:title" content={frontMatter.title} />
        <meta name="twitter:description" content={frontMatter.description} />
        <meta name="twitter:image" content="/edh/splash.jpg" />
      </Head>

      <Section grow className={styles.edh}>
        <VerticalHero imageUrl="/edh/hero.jpg">
          <TitleShape icon={faDragon}>{frontMatter.title}</TitleShape>
          <p className={sharedStyles['page__descriptor']}>{frontMatter.description}</p>
        </VerticalHero>

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
