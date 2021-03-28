import React from 'react';
import {Section} from 'components/Section';
import {Container} from 'components/Container';
import {Link} from 'components/Link';
import {TitleShape} from 'components/TitleShape';
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons';
import {posts} from 'blog-posts';

import styles from './index.scss';

export const BlogList = ({}) =>
  <Section grow id='BlogList' className='blog-list'>
    <Container>
      <TitleShape icon={faQuoteLeft} alt='Sticky note'>Blog Posts</TitleShape>
      <p className='blog-list__descriptor'>A collection of various thoughts and anecdotes I have</p>
      <p className='blog-post__descriptor blog-post__descriptor--small'><Link to='/'>Back to home</Link></p>

      {posts.map(post => <div key={`post.${post.slug}`} className='post'>
        <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
        <p className='post__description'>{post.description}</p>
        <small className='post__date'>Published: {post.date.split('T')[0]}</small>
      </div>)}
    </Container>
  </Section>;