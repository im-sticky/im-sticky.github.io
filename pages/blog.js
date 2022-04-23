import React from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import clsx from 'clsx';
import {getAllPosts} from 'helpers/mdxUtils.mjs';
import {Section} from 'components/Section';
import {Container} from 'components/Container';
import {InternalLink} from 'components/Link';
import {TitleShape} from 'components/TitleShape';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faQuoteLeft,
  faRssSquare,
  faLongArrowAltLeft,
  faLongArrowAltRight,
} from '@fortawesome/free-solid-svg-icons';
import {formatDate} from 'helpers/formatDate';
import {SITE_URL} from 'helpers/constants';
import sharedStyles from 'styles/Shared.module.scss';
import styles from 'styles/Blog.module.scss';

export default function Blog({posts}) {
  const router = useRouter();
  const {page} = router.query;
  const pageState = page ? parseInt(page) : 1;
  const postsPerPage = 8;
  const filteredPosts = posts.slice((pageState - 1) * postsPerPage, pageState * postsPerPage);

  return (
    <>
      <Head>
        <title>Alex Craig | Blog</title>

        <meta property="og:site_name" content="Alex Craig's Blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:title" content="Blog" />
        <meta property="og:description" content="Alex Craig's Blog" />
        <meta property="og:image" content="/mstile-144x144.png" />

        <meta name="twitter:site" content="@im_sticky" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={`${SITE_URL}/blog`} />
        <meta name="twitter:title" content="Blog" />
        <meta name="twitter:description" content="Alex Craig's Blog" />
        <meta name="twitter:image" content="/mstile-144x144.png" />
      </Head>

      <Section grow id="BlogList" className={styles['blog-list']}>
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
          <TitleShape icon={faQuoteLeft}>Blog Posts</TitleShape>
          <p className={sharedStyles['page__descriptor']}>
            A collection of my thoughts and anecdotes
          </p>
          <p
            className={clsx(
              sharedStyles['page__descriptor'],
              sharedStyles['page__descriptor--small']
            )}
          >
            <InternalLink noUnderline to="/feed.xml" target="_blank">
              <FontAwesomeIcon icon={faRssSquare} className={styles['blog-list__rss']} />
              RSS Feed
            </InternalLink>
          </p>

          {filteredPosts.map((post) => (
            <div key={`post.${post.slug}`} className={styles.post}>
              <h3>
                <InternalLink to={`/blog/${post.slug}`}>{post.title}</InternalLink>
              </h3>
              <p className={styles.post__description}>{post.description}</p>
              <small className={styles.post__date}>{formatDate(post.date)}</small>
            </div>
          ))}

          <div className={sharedStyles['pagination']}>
            {pageState > 1 ? (
              <InternalLink icon to={pageState === 2 ? '/blog' : `/blog?page=${pageState - 1}`}>
                <FontAwesomeIcon
                  icon={faLongArrowAltLeft}
                  className={sharedStyles['page__back-icon']}
                />
                Newer posts
              </InternalLink>
            ) : null}

            {pageState < Math.ceil(posts.length / postsPerPage) ? (
              <InternalLink
                icon
                to={`/blog?page=${pageState + 1}`}
                className={sharedStyles['pagination__previous']}
              >
                Older posts
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

// get posts from serverside at build time
export const getStaticProps = async () => {
  const posts = getAllPosts(['title', 'slug', 'date', 'description', 'edited']);

  // return the posts props
  return {props: {posts}};
};
