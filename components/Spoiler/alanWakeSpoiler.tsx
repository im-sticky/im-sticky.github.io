'use client';

import React, {useState, useRef} from 'react';
import clsx from 'clsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';
import specificStyles from './alanWakeSpoiler.module.scss';

interface AlanWakeSpoilerProps {
  children: React.ReactNode;
}

export function AlanWakeSpoiler({children}: AlanWakeSpoilerProps) {
  const [spoiled, setSpoiled] = useState(false);
  const [beingPressed, setBeingPressed] = useState(false);
  const animationRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  let count = 0;

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;

      count = count + deltaTime / 1000;
    }

    if (parseFloat(count.toFixed(1)) === 2.2 && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      setSpoiled(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      previousTimeRef.current = time;
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  return (
    <div
      className={clsx(
        'large-spoiler',
        styles.spoiler,
        styles['spoiler--no-anim'],
        specificStyles['alan-wake-spoiler'],
        {
          [styles['spoiler--spoiled']]: spoiled,
          [specificStyles['alan-wake-spoiler--pressing']]: beingPressed,
        }
      )}
    >
      {children}
      <button
        type="button"
        className={styles.spoiler__button}
        onMouseDown={(e: React.MouseEvent) => {
          setBeingPressed(true);
          animationRef.current = requestAnimationFrame(animate);
        }}
        onMouseUp={(e: React.MouseEvent) => {
          if (!animationRef.current) {
            return;
          }
          cancelAnimationFrame(animationRef.current);
          setBeingPressed(false);
          previousTimeRef.current = undefined;
          count = 0;
        }}
      >
        <span className={styles.spoiler__text}>Reveal&nbsp;Spoiler</span>
        <FontAwesomeIcon icon={faEyeSlash} />
      </button>
    </div>
  );
}
