import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {NotFound} from 'pages/NotFound';
import {Section} from 'components/Section';
import {Container} from 'components/Container';
import {Link} from 'components/Link';
import {TitleShape} from 'components/TitleShape';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faQuoteLeft, faRssSquare, faLongArrowAltLeft, faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';
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
      <p className='blog-post__descriptor blog-post__descriptor--small blog-post__descriptor--spaced'>
        <Link icon to='/blog'>
          <FontAwesomeIcon icon={faLongArrowAltLeft} alt='Back arrow' className='blog-post__back-icon' />
          Back to posts
        </Link>
      </p>
      <TitleShape icon={faQuoteLeft} alt='Sticky note'>{post.title}</TitleShape>
      <p className='blog-post__descriptor'>{post.description}</p>
      <p className='blog-post__descriptor blog-post__descriptor--small'>Published: {post.date.split('T')[0]}</p>

      <div className='blog-post__content' dangerouslySetInnerHTML={{__html: post.__content}}/>

      <div className='blog-pagination'>
        {postIndex > 0 ?
          <Link icon to={`/blog/${posts[postIndex - 1].slug}`}>
            <FontAwesomeIcon icon={faLongArrowAltLeft} alt='Back arrow' className='blog-post__back-icon' />
            Next post
          </Link> :
          null}
        {postIndex + 1 < posts.length ?
          <Link icon to={`/blog/${posts[postIndex + 1].slug}`} className='blog-pagination__previous'>
            Previous post
            <FontAwesomeIcon icon={faLongArrowAltRight} alt='Next arrow' className='blog-post__next-icon' />
          </Link> :
          null}
      </div>

      <ExternalLinkIcon id='hidden-icon' className='hidden' />
    </Container>
  </Section>;
};