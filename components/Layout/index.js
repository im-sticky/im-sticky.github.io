import React from 'react';
import {Section} from 'components/Section';
import {InternalLink} from 'components/Link';

import styles from './index.module.scss';

export function Layout({children, includeFooter = true}) {
  return (
    <>
      {children}
      {includeFooter ? (
        <Section id="Footer" className={styles.footer}>
          <ul className={styles.footer__list}>
            <li className={styles['footer__list-item']}>
              <InternalLink to="/projects">Projects</InternalLink>
            </li>
            <li className={styles['footer__list-item']}>
              <InternalLink to="/blog">Blog</InternalLink>
            </li>
            <li className={styles['footer__list-item']}>&copy;&nbsp;{new Date().getFullYear()}</li>
          </ul>
        </Section>
      ) : null}
    </>
  );
}
