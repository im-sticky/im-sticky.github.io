'use client';

import React, {useState} from 'react';
import clsx from 'clsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';

interface SpoilerProps {
  children: React.ReactNode;
  inline?: boolean;
}

export function Spoiler({inline = false, children}: SpoilerProps) {
  const [spoiled, setSpoiled] = useState(false);
  const SpoilerTag = (inline ? 'span' : 'div') as keyof JSX.IntrinsicElements;

  return (
    <SpoilerTag
      className={clsx(styles.spoiler, {
        [styles['spoiler--spoiled']]: spoiled,
        [styles['spoiler--inline']]: inline,
      })}
    >
      {children}
      <button type="button" className={styles.spoiler__button} onClick={() => setSpoiled(true)}>
        <span className={styles.spoiler__text}>Reveal&nbsp;Spoiler</span>
        <FontAwesomeIcon icon={faEyeSlash} />
      </button>
    </SpoilerTag>
  );
}
