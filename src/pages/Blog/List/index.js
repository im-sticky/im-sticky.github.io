import React from 'react';
import {Section} from 'components/Section';
import {Container} from 'components/Container';
import {Link} from 'components/Link';
import {TitleShape} from 'components/TitleShape';
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons';
import * as posts from 'blog-posts';

import styles from './index.scss';

export const BlogList = ({}) => {
  const sortedPosts = Object.values(posts).sort((a, b) => a.date > b.date ? -1 : 1);

  return <Section grow id='BlogList' className='blog-list'>
    <Container>
      <h1 className='blog-list__title'>
        Blog Posts
        <TitleShape icon={faQuoteLeft} alt='Sticky note' />
      </h1>
      <p>A collection of various thoughts and anecdotes I have</p>

      {sortedPosts.map(post => <div key={`post.${post.slug}`} className='blog-post'>
        <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
        <p className='blog-post__descriptor'>{post.description}</p>
        <p className='blog-post__descriptor blog-post__descriptor--small'>Published: {post.date.split('T')[0]}</p>
      </div>)}
    </Container>
  </Section>;
};