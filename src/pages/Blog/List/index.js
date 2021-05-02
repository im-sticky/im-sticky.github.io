import React from 'react';
import {useParams} from 'react-router-dom';
import {Section} from 'components/Section';
import {Container} from 'components/Container';
import {Link} from 'components/Link';
import {TitleShape} from 'components/TitleShape';
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons';
import {posts} from 'blog-posts';
import {NotFound} from 'pages/NotFound';

import styles from './index.scss';

export const BlogList = ({}) => {
  const {page} = useParams();
  const pageState = page ? parseInt(page) : 1;
  const postsPerPage = 5;
  const filteredPosts = posts.slice((pageState - 1) * postsPerPage, pageState * postsPerPage);

  if (filteredPosts.length === 0) {
    return <NotFound />;
  }

  return <Section grow id='BlogList' className='blog-list'>
    <Container>
      <TitleShape icon={faQuoteLeft} alt='Sticky note'>Blog Posts</TitleShape>
      <p className='blog-list__descriptor'>A collection of my thoughts and anecdotes</p>
      <p className='blog-post__descriptor blog-post__descriptor--small'><Link to='/'>Back to home</Link></p>

      {filteredPosts.map(post => <div key={`post.${post.slug}`} className='post'>
        <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
        <p className='post__description'>{post.description}</p>
        <small className='post__date'>Published: {post.date.split('T')[0]}</small>
      </div>)}

      <div className='blog-pagination'>
        {pageState > 1 ?
          <Link to={pageState === 2 ? '/blog' : `/blog/page/${pageState - 1}`}>Newer posts</Link> :
          null}
        {pageState < Math.ceil(posts.length / postsPerPage) ?
          <Link to={`/blog/page/${pageState + 1}`} className='blog-pagination__previous'>Older posts</Link> :
          null}
      </div>
    </Container>
  </Section>;
};