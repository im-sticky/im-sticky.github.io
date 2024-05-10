import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';

export function Spoiler({children}) {
  const [spoiled, setSpoiled] = useState(false);

  return (
    <div className={clsx(styles.spoiler, {[styles['spoiler--spoiled']]: spoiled})}>
      {children}
      <button type="button" className={styles.spoiler__button} onClick={() => setSpoiled(true)}>
        <span className={styles.spoiler__text}>Reveal Spoiler</span>
        <FontAwesomeIcon icon={faEyeSlash} />
      </button>
    </div>
  );
}

Spoiler.propTypes = {
  children: PropTypes.any.isRequired,
};
