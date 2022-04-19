import React from 'react';
import Head from 'next/head';
import {serialize} from 'next-mdx-remote/serialize';
import {MDXRemote} from 'next-mdx-remote';
import {getAllPosts, getPost} from 'helpers/mdxUtils.mjs';
import clsx from 'clsx';
import {Section} from 'components/Section';
import {Container} from 'components/Container';
import {InternalLink} from 'components/Link';
import {TitleShape} from 'components/TitleShape';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faQuoteLeft,
  faLongArrowAltLeft,
  faLongArrowAltRight,
} from '@fortawesome/free-solid-svg-icons';
import {ExternalLink} from 'components/Link';
import {Figure} from 'components/Figure';
import {formatDate} from 'helpers/formatDate';
import {SITE_URL} from 'helpers/constants';
import styles from 'styles/BlogPost.module.scss';
import sharedStyles from 'styles/BlogShared.module.scss';

const mdxComponents = {ExternalLink, Figure};

export default function Post({source, frontMatter, posts, slug}) {
  const postIndex = posts.findIndex((p) => p.slug === slug);

  return (
    <>
      <Head>
        <title>Alex Craig | {frontMatter.title}</title>

        <meta property="og:site_name" content={frontMatter.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/${slug}`} />
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={frontMatter.description} />
        <meta
          property="og:image"
          content={frontMatter.hero ? `/assets/${frontMatter.hero}` : '/mstile-144x144.png'}
        />

        <meta name="twitter:site" content="@im_sticky" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={`${SITE_URL}/${slug}`} />
        <meta name="twitter:title" content={frontMatter.title} />
        <meta name="twitter:description" content={frontMatter.description} />
        <meta
          name="twitter:image"
          content={frontMatter.hero ? `/assets/${frontMatter.hero}` : '/mstile-144x144.png'}
        />
      </Head>

      <Section
        grow
        id="BlogPost"
        className={clsx(styles['blog-post'], {[styles['blog-post--has-hero']]: frontMatter.hero})}
      >
        {frontMatter.hero ? (
          <>
            <img
              className={clsx(styles['blog-post__hero'], {
                [styles['blog-post__hero--top']]: frontMatter.heroPosition === 'top',
                [styles['blog-post__hero--bottom']]: frontMatter.heroPosition === 'bottom',
              })}
              src={`/assets/${frontMatter.hero}`}
              role="presentation"
            />
            <div className={styles['blog-post__hero-screen']} />
          </>
        ) : null}

        <Container>
          <p
            className={clsx(
              sharedStyles['blog-post__descriptor'],
              sharedStyles['blog-post__descriptor--small'],
              sharedStyles['blog-post__descriptor--spaced']
            )}
          >
            <InternalLink icon to="/blog">
              <FontAwesomeIcon
                icon={faLongArrowAltLeft}
                alt="Back arrow"
                className={sharedStyles['blog-post__back-icon']}
              />
              Back to posts
            </InternalLink>
          </p>
          <TitleShape className={styles['blog-post__title']} icon={faQuoteLeft} alt="Sticky note">
            {frontMatter.title}
          </TitleShape>
          <p className={sharedStyles['blog-post__descriptor']}>{frontMatter.description}</p>
          <p
            className={clsx(
              sharedStyles['blog-post__descriptor'],
              sharedStyles['blog-post__descriptor--small'],
              sharedStyles['blog-post__descriptor--italic'],
              {
                [sharedStyles['blog-post__descriptor--spaced']]: frontMatter.edited,
              }
            )}
          >
            {formatDate(frontMatter.date)}
          </p>
          {frontMatter.edited ? (
            <p
              className={
                (sharedStyles['blog-post__descriptor'],
                sharedStyles['blog-post__descriptor--small'],
                sharedStyles['blog-post__descriptor--italic'])
              }
            >
              This post was edited on {formatDate(frontMatter.edited)}
            </p>
          ) : null}

          <article className={styles['blog-post__content']}>
            <MDXRemote {...source} components={mdxComponents} />
          </article>

          <div className={sharedStyles['blog-pagination']}>
            {postIndex > 0 ? (
              <InternalLink icon to={`/blog/${posts[postIndex - 1].slug}`}>
                <FontAwesomeIcon
                  icon={faLongArrowAltLeft}
                  alt="Back arrow"
                  className={sharedStyles['blog-post__back-icon']}
                />
                Next post
              </InternalLink>
            ) : null}

            {postIndex + 1 < posts.length ? (
              <InternalLink
                icon
                to={`/blog/${posts[postIndex + 1].slug}`}
                className={sharedStyles['blog-pagination__previous']}
              >
                Previous post
                <FontAwesomeIcon
                  icon={faLongArrowAltRight}
                  alt="Next arrow"
                  className={sharedStyles['blog-post__next-icon']}
                />
              </InternalLink>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  );
}

export const getStaticProps = async (context) => {
  const posts = getAllPosts(['date', 'slug']);
  const {slug} = context.params;
  const {content, data} = getPost(slug);

  const mdxSource = await serialize(content);

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      posts,
      slug,
    },
  };
};

export const getStaticPaths = () => {
  const posts = getAllPosts(['date', 'slug']);
  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
