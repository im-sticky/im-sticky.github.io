import clsx from 'clsx';
import {Metadata} from 'next';
import {getAllPosts} from '@helpers/postUtils.mjs';
import {Section} from '@components/Section';
import {Container} from '@components/Container';
import {InternalLink} from '@components/InternalLink';
import {TitleShape} from '@components/TitleShape';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faQuoteLeft, faRssSquare, faLongArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {openGraphMeta} from '@helpers/openGraphMeta';
import {IBlogPost} from '@models/blogPost';
import {PostList} from './postList';
import sharedStyles from '@styles/shared.module.scss';
import styles from './index.module.scss';

export const metadata: Metadata = {
  title: 'Blog',
  description: "Alex Craig's Blog.",
  openGraph: openGraphMeta('/blog'),
};

export default function Blog() {
  const posts = getAllPosts([
    'title',
    'slug',
    'date',
    'description',
    'customLink',
    'category',
  ]) as IBlogPost[];

  return (
    <Section grow className={styles['blog-list']}>
      <Container>
        <p
          className={clsx(
            sharedStyles['page__descriptor'],
            sharedStyles['page__descriptor--small'],
            sharedStyles['page__descriptor--spaced']
          )}
        >
          <InternalLink icon to="/">
            <FontAwesomeIcon icon={faLongArrowLeft} className={sharedStyles['page__back-icon']} />
            Back to about
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
          <InternalLink noUnderline newTab to="/feed.xml">
            <FontAwesomeIcon icon={faRssSquare} className={styles['blog-list__rss']} />
            RSS Feed
          </InternalLink>
        </p>

        <PostList allPosts={posts} />
      </Container>
    </Section>
  );
}
