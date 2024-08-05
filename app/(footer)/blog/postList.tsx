'use client';

import {useSearchParams} from 'next/navigation';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLongArrowLeft, faLongArrowRight} from '@fortawesome/free-solid-svg-icons';
import {formatDate} from '@helpers/formatDate';
import {InternalLink} from '@components/InternalLink';
import {IBlogPost} from '@models/blogPost';
import sharedStyles from '@styles/shared.module.scss';
import styles from './index.module.scss';

interface PostListProps {
  allPosts: IBlogPost[];
}

export function PostList({allPosts}: PostListProps) {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const pageState = page ? parseInt(page) : 1;
  const postsPerPage = 10;
  const filteredPosts = allPosts.slice((pageState - 1) * postsPerPage, pageState * postsPerPage);

  return (
    <>
      {filteredPosts.map((post) => (
        <div key={`post.${post.slug}`} className={styles.post}>
          <h3>
            <InternalLink to={post.customLink ?? `/blog/${post.slug}`}>{post.title}</InternalLink>
          </h3>
          <p className={styles.post__description}>{post.description}</p>
          <small className={styles.post__date}>{formatDate(post.date)}</small>
        </div>
      ))}

      <div className={sharedStyles['pagination']}>
        {pageState > 1 ? (
          <InternalLink icon to={pageState === 2 ? '/blog' : `/blog?page=${pageState - 1}`}>
            <FontAwesomeIcon icon={faLongArrowLeft} className={sharedStyles['page__back-icon']} />
            Newer posts
          </InternalLink>
        ) : null}

        {pageState < Math.ceil(allPosts.length / postsPerPage) ? (
          <InternalLink
            icon
            to={`/blog?page=${pageState + 1}`}
            className={sharedStyles['pagination__previous']}
          >
            Older posts
            <FontAwesomeIcon icon={faLongArrowRight} className={sharedStyles['page__next-icon']} />
          </InternalLink>
        ) : null}
      </div>
    </>
  );
}
