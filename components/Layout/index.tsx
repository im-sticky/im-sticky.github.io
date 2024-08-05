import React from 'react';
import {Section} from '@components/Section';
import {InternalLink} from '@components/InternalLink';
import styles from './index.module.scss';

interface LayoutProps {
  children: React.ReactNode;
  includeFooter?: boolean;
}

export function Layout({children, includeFooter = true}: LayoutProps) {
  return (
    <div id="main">
      {children}
      {includeFooter ? (
        <Section className={styles.footer}>
          <ul className={styles.footer__list}>
            <li className={styles['footer__list-item']}>
              <InternalLink to="/">About</InternalLink>
            </li>
            <li className={styles['footer__list-item']}>
              <InternalLink to="/blog">Blog</InternalLink>
            </li>
            <li className={styles['footer__list-item']}>
              <InternalLink to="/projects">Projects &amp; Hobbies</InternalLink>
            </li>
            <li className={styles['footer__list-item']}>&copy;&nbsp;{new Date().getFullYear()}</li>
          </ul>
        </Section>
      ) : null}
    </div>
  );
}
