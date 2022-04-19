import React from 'react';
import {Section} from 'components/Section';
import {ExternalLink} from 'components/ExternalLink';

import styles from './index.module.scss';

export function Layout({children}) {
  return (
    <>
      {children}
      <Section id="Footer" className={styles.footer}>
        <small>
          Hosted with <ExternalLink href="https://pages.github.com/">GitHub Pages</ExternalLink>{' '}
          &copy;&nbsp;{new Date().getFullYear()}
        </small>
      </Section>
    </>
  );
}
