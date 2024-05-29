import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './index.module.scss';

export function PullQuote({quote, left = false, right = false}) {
  return (
    <aside
      className={clsx(styles.quote, {
        [styles['quote--left']]: left,
        [styles['quote--right']]: right,
      })}
    >
      <FontAwesomeIcon icon={faQuoteLeft} alt="" className={styles.quote__icon} />
      <p>{quote}</p>
    </aside>
  );
}

PullQuote.propTypes = {
  quote: PropTypes.string.isRequired,
  left: PropTypes.bool,
  right: PropTypes.bool,
};
