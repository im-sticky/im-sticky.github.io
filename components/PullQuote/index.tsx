import React from 'react';
import clsx from 'clsx';
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './index.module.scss';

interface PullQuoteProps {
  quote: string;
  left?: boolean;
  right?: boolean;
}

export function PullQuote({quote, left = false, right = false}: PullQuoteProps) {
  return (
    <aside
      className={clsx(styles.quote, {
        [styles['quote--left']]: left,
        [styles['quote--right']]: right,
      })}
    >
      <FontAwesomeIcon icon={faQuoteLeft} className={styles.quote__icon} />
      <p>{quote}</p>
    </aside>
  );
}
