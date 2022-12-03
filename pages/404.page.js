import React from 'react';
import {Section} from 'components/Section';
import {Container} from 'components/Container';
import {InternalLink} from 'components/Link';

import styles from 'styles/404.module.scss';

export default function NotFound({}) {
  return (
    <Section grow className={styles['not-found']}>
      <Container>
        <h1 className={styles['not-found__title']}>404</h1>
        <p className={styles['not-found__text']}>This page does not exist</p>
        <InternalLink to="/" className={styles['not-found__back']}>
          Home
        </InternalLink>
      </Container>
    </Section>
  );
}
