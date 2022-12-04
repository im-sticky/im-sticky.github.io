import React from 'react';
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
import {PageHead} from 'components/PageHead';
import styles from 'styles/Edh.module.scss';
import sharedStyles from 'styles/Shared.module.scss';

const mdxComponents = {ExternalLink, Figure};

export default function Edh({source, frontMatter}) {
  return (
    <>
      <PageHead
        url="edh"
        title={frontMatter.title}
        description={frontMatter.description}
        image="/edh/splash.jpg"
      />

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
