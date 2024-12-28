'use client';

import React, {useState} from 'react';
import clsx from 'clsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {confetti} from '@tsparticles/confetti';
import styles from './index.module.scss';

interface SpoilerProps {
  children: React.ReactNode;
  className?: string;
  inline?: boolean;
  doConfetti?: boolean;
}

export function Spoiler({inline = false, doConfetti = false, className, children}: SpoilerProps) {
  const [spoiled, setSpoiled] = useState(false);
  const SpoilerTag = (inline ? 'span' : 'div') as keyof JSX.IntrinsicElements;

  return (
    <SpoilerTag
      className={clsx(className, styles.spoiler, {
        [styles['spoiler--spoiled']]: spoiled,
        [styles['spoiler--inline']]: inline,
      })}
    >
      {children}
      <button
        type="button"
        className={styles.spoiler__button}
        onClick={async (e: React.MouseEvent) => {
          setSpoiled(true);

          if (doConfetti) {
            const rect = (e.target as HTMLButtonElement).getBoundingClientRect();

            await confetti({
              position: {
                x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
                y: ((rect.top + rect.height / 2) / window.innerHeight) * 100,
              },
            });
          }
        }}
      >
        <span className={styles.spoiler__text}>Reveal&nbsp;Spoiler</span>
        <FontAwesomeIcon icon={faEyeSlash} />
      </button>
    </SpoilerTag>
  );
}
