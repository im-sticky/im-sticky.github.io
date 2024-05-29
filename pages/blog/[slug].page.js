import React, {useEffect, useState} from 'react';
import {serialize} from 'next-mdx-remote/serialize';
import {MDXRemote} from 'next-mdx-remote';
import {getAllPosts, getPost} from 'helpers/postUtils.mjs';
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
import {Spoiler} from 'components/Spoiler';
import {ImageCard} from 'components/ImageCard';
import {PageHead} from 'components/PageHead';
import {TableOfContents} from 'components/TableOfContents';
import {formatDate} from 'helpers/formatDate';
import styles from 'styles/BlogPost.module.scss';
import sharedStyles from 'styles/Shared.module.scss';

const mdxComponents = {ExternalLink, Figure, InternalLink, Spoiler, ImageCard, TableOfContents};

export default function Post({source, frontMatter, posts, slug}) {
  const [postIndex, setPostIndex] = useState(posts.findIndex((p) => p.slug === slug));

  useEffect(() => {
    setPostIndex(posts.findIndex((p) => p.slug === slug));
  }, [slug]);

  return (
    <>
      <PageHead
        url={slug}
        title={frontMatter.title}
        description={frontMatter.description}
        image={
          frontMatter.shareAsset
            ? `/assets/${frontMatter.shareAsset}`
            : frontMatter.hero
            ? `/assets/${frontMatter.hero}`
            : '/mstile-144x144.png'
        }
      />

      <Section
        grow
        className={clsx(styles['blog-post'], {
          [styles['blog-post--has-hero']]: frontMatter.hero || frontMatter.heroVideo,
        })}
      >
        {frontMatter.hero && !frontMatter.heroVideo ? (
          <img
            className={clsx(styles['blog-post__hero'], {
              [styles['blog-post__hero--top']]: frontMatter.heroPosition === 'top',
              [styles['blog-post__hero--bottom']]: frontMatter.heroPosition === 'bottom',
            })}
            src={`/assets/${frontMatter.hero}`}
            alt=""
          />
        ) : null}

        {frontMatter.heroVideo ? (
          <video
            key={slug}
            autoPlay
            muted
            loop
            className={clsx(styles['blog-post__hero'], {
              [styles['blog-post__hero--top']]: frontMatter.heroPosition === 'top',
              [styles['blog-post__hero--bottom']]: frontMatter.heroPosition === 'bottom',
              [styles['blog-post__hero--left']]: frontMatter.mobileHeroPosition === 'left',
              [styles['blog-post__hero--right']]: frontMatter.mobileHeroPosition === 'right',
            })}
          >
            <source
              src={`/assets/${frontMatter.heroVideo}`}
              type={`video/${frontMatter.heroVideo.split('.').pop()}`}
            />
          </video>
        ) : null}

        {frontMatter.hero || frontMatter.heroVideo ? (
          <div className={styles['blog-post__hero-screen']} />
        ) : null}

        <Container>
          <p
            className={clsx(
              sharedStyles['page__descriptor'],
              sharedStyles['page__descriptor--small'],
              sharedStyles['page__descriptor--spaced']
            )}
          >
            <InternalLink icon to="/blog">
              <FontAwesomeIcon
                icon={faLongArrowAltLeft}
                className={sharedStyles['page__back-icon']}
              />
              Back to posts
            </InternalLink>
          </p>
          <TitleShape className={styles['blog-post__title']} icon={faQuoteLeft}>
            {frontMatter.title}
          </TitleShape>
          <p className={sharedStyles['page__descriptor']}>{frontMatter.description}</p>
          <p
            className={clsx(
              sharedStyles['page__descriptor'],
              sharedStyles['page__descriptor--small'],
              sharedStyles['page__descriptor--italic'],
              {
                [sharedStyles['page__descriptor--spaced']]: frontMatter.edited,
              }
            )}
          >
            {formatDate(frontMatter.date)}
          </p>
          {frontMatter.edited ? (
            <p
              className={clsx(
                sharedStyles['page__descriptor'],
                sharedStyles['page__descriptor--small'],
                sharedStyles['page__descriptor--italic']
              )}
            >
              This post was edited on {formatDate(frontMatter.edited)}
            </p>
          ) : null}

          <article className={styles['blog-post__content']}>
            <MDXRemote {...source} components={mdxComponents} />
          </article>

          <div className={sharedStyles['pagination']}>
            {postIndex > 0 ? (
              <InternalLink
                icon
                to={posts[postIndex - 1].customLink ?? `/blog/${posts[postIndex - 1].slug}`}
              >
                <FontAwesomeIcon
                  icon={faLongArrowAltLeft}
                  className={sharedStyles['page__back-icon']}
                />
                Next post
              </InternalLink>
            ) : null}

            {postIndex + 1 < posts.length ? (
              <InternalLink
                icon
                to={posts[postIndex + 1].customLink ?? `/blog/${posts[postIndex + 1].slug}`}
                className={sharedStyles['pagination__previous']}
              >
                Previous post
                <FontAwesomeIcon
                  icon={faLongArrowAltRight}
                  className={sharedStyles['page__next-icon']}
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
  const posts = getAllPosts(['date', 'slug', 'customLink']);
  const {slug} = context.params;
  const {content, data} = getPost(slug);

  if (data.customLink) {
    return {
      redirect: {
        destination: data.customLink,
        permanent: true,
      },
    };
  }

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
