import React from 'react';
import {useParams} from 'react-router-dom';
import {Section} from 'components/Section';
import {Container} from 'components/Container';
import {Link} from 'components/Link';
import {TitleShape} from 'components/TitleShape';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faQuoteLeft, faRssSquare, faLongArrowAltLeft, faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';
import {posts} from 'blog-posts';
import {NotFound} from 'pages/NotFound';
import {formatDate} from 'helpers/formatDate';

import styles from './index.scss';

export const BlogList = ({}) => {
  const {page} = useParams();
  const pageState = page ? parseInt(page) : 1;
  const postsPerPage = 6;
  const filteredPosts = posts.slice((pageState - 1) * postsPerPage, pageState * postsPerPage);

  if (filteredPosts.length === 0) {
    return <NotFound />;
  }

  return <Section grow id='BlogList' className='blog-list'>
    <Container>
      <p className='blog-post__descriptor blog-post__descriptor--small blog-post__descriptor--spaced'>
        <Link icon to='/'>
          <FontAwesomeIcon icon={faLongArrowAltLeft} alt='Back arrow' className='blog-post__back-icon' />
          Back to home
        </Link>
      </p>
      <TitleShape icon={faQuoteLeft} alt='Sticky note'>Blog Posts</TitleShape>
      <p className='blog-list__descriptor'>A collection of my thoughts and anecdotes</p>
      <p className='blog-post__descriptor'>
        <Link noUnderline href='/feed.xml' target='_blank'>
          <FontAwesomeIcon icon={faRssSquare} alt='RSS feed' className='blog-list__rss' />
          RSS Feed
        </Link>
      </p>

      {filteredPosts.map(post => <div key={`post.${post.slug}`} className='post'>
        <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
        <p className='post__description'>{post.description}</p>
        <small className='post__date'>{formatDate(post.date)}</small>
      </div>)}

      <div className='blog-pagination'>
        {pageState > 1 ?
          <Link icon to={pageState === 2 ? '/blog' : `/blog/page/${pageState - 1}`}>
            <FontAwesomeIcon icon={faLongArrowAltLeft} alt='Back arrow' className='blog-post__back-icon' />
            Newer posts
          </Link> :
          null}
        {pageState < Math.ceil(posts.length / postsPerPage) ?
          <Link icon to={`/blog/page/${pageState + 1}`} className='blog-pagination__previous'>
            Older posts
            <FontAwesomeIcon icon={faLongArrowAltRight} alt='Next arrow' className='blog-post__next-icon' />
          </Link> :
          null}
      </div>
    </Container>
  </Section>;
};