import React from 'react';
import {Section} from 'components/Section';
import {Container} from 'components/Container';
import {Link} from 'components/Link';

import styles from './index.scss';

export const NotFound = ({}) => <Section grow id='NotFound' className='not-found'>
  <Container>
    <h1 className='not-found__title'>404</h1>
    <p className='not-found__text'>This page does not exist</p>
    <Link to='/' className='not-found__back'>Home</Link>
  </Container>
</Section>