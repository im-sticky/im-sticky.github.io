import React, {useState} from 'react';
import clsx from 'clsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';

interface SpoilerProps {
  children: React.ReactNode;
}

export function Spoiler({children}: SpoilerProps) {
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
