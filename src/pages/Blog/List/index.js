import React from 'react';
import {Section} from 'components/Section';
import {Container} from 'components/Container';
import {Link} from 'components/Link';
import {TitleShape} from 'components/TitleShape';
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons';


import styles from './index.scss';

export const BlogList = ({}) => {
 return <Section grow id='BlogList' className='blog-list'>
    <Container>
      <h1 className='blog-list__title'>
        Blog Posts
        <TitleShape icon={faQuoteLeft} alt='Sticky note' />
      </h1>
      <p>A collection of various thoughts and anecdotes I have</p>
    </Container>
  </Section>;
};