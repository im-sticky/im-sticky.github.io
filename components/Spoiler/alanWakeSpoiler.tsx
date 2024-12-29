'use client';

import React, {useState, useRef, useEffect} from 'react';
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mainBodyRef = useRef<HTMLDivElement>();
  let count = 0;

  useEffect(() => {
    if (!mainBodyRef.current) {
      mainBodyRef.current = document.querySelector<HTMLDivElement>('#main') ?? undefined;
    }
  }, []);

  useEffect(() => {
    if (!animationRef.current || !mainBodyRef.current || !buttonRef.current) {
      return;
    }

    if (beingPressed) {
      mainBodyRef.current.style.transformOrigin = `50% ${
        buttonRef.current.getBoundingClientRect().top + document.documentElement.scrollTop
      }px`;
      mainBodyRef.current.classList.add('alan-wake-spoiler--zoom');
      console.log(mainBodyRef.current.style.transformOrigin);
    } else {
      cancelAnimationFrame(animationRef.current);
      mainBodyRef.current.classList.remove('alan-wake-spoiler--zoom');
      previousTimeRef.current = undefined;
      count = 0;
    }
  }, [beingPressed]);

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;

      count = count + deltaTime / 1000;
    }

    if (Math.floor(count) === 3 && animationRef.current) {
      setBeingPressed(false);
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
        }
      )}
    >
      {children}
      <button
        type="button"
        ref={buttonRef}
        className={clsx(styles.spoiler__button, {
          [specificStyles['spoiler__text--pressing']]: beingPressed,
        })}
        onMouseDown={() => {
          setBeingPressed(true);
          animationRef.current = requestAnimationFrame(animate);
        }}
        onMouseUp={() => {
          if (!animationRef.current) {
            return;
          }
          setBeingPressed(false);
        }}
        onMouseLeave={() => {
          if (!animationRef.current) {
            return;
          }
          setBeingPressed(false);
        }}
      >
        <span className={styles.spoiler__text}>Hold to Reveal</span>
        <FontAwesomeIcon icon={faEyeSlash} />
      </button>
    </div>
  );
}
