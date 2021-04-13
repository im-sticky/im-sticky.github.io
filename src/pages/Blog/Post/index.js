import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {NotFound} from 'pages/NotFound';
import {Section} from 'components/Section';
import {Container} from 'components/Container';
import {Link} from 'components/Link';
import {TitleShape} from 'components/TitleShape';
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons';
import {posts} from 'blog-posts';
import {ExternalLinkIcon} from 'components/ExternalLink';

import styles from './index.scss';

export const BlogPost = ({}) => {
  const {slug} = useParams();
  const post = posts.find(p => p.slug === slug);
  const postIndex = posts.findIndex(p => p.slug === slug);

  useEffect(() => {
    const title = !!post ? post.title : 'Not Found';
    
    document.title = `Alex Craig | ${title}`;

    if (post) {
      const linkIcon = document.getElementById('hidden-icon');
      const externalLinks = document.querySelector('.blog-post__content').querySelectorAll('.external-link');

      externalLinks.forEach(e => {
        const clonedIcon = linkIcon.cloneNode(true);

        clonedIcon.classList.remove('hidden');
        clonedIcon.id = null;

        e.append(clonedIcon);
      });
    }
  }, [post]);

  if (!post) {
    return <NotFound />;
  }

  return <Section grow id='BlogPost' className='blog-post'>
    <Container>
      <TitleShape icon={faQuoteLeft} alt='Sticky note'>{post.title}</TitleShape>
      <p className='blog-post__descriptor'>{post.description}</p>
      <p className='blog-post__descriptor blog-post__descriptor--small'>Published: {post.date.split('T')[0]}</p>
      <p className='blog-post__descriptor blog-post__descriptor--small'><Link to='/blog'>Back to posts</Link></p>

      <div className='blog-post__content' dangerouslySetInnerHTML={{__html: post.__content}}/>

      <div className='blog-post__related'>
        {postIndex + 1 < posts.length ?
          <Link to={`/blog/${posts[postIndex + 1].slug}`}>Previous Post</Link> :
          null}
        {postIndex > 0 ?
          <Link to={`/blog/${posts[postIndex - 1].slug}`} className='next-post'>Next post</Link> :
          null}
      </div>

      <ExternalLinkIcon id='hidden-icon' className='hidden' />
    </Container>
  </Section>;
};