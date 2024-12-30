'use client';

import React, {useState, useRef, useEffect} from 'react';
import clsx from 'clsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {getMobileOperatingSystem, OperatingSystem} from '@helpers/checkMobileBrowser';
import styles from './index.module.scss';
import specificStyles from './alanWakeSpoiler.module.scss';

interface AlanWakeSpoilerProps {
  children: React.ReactNode;
}

export function AlanWakeSpoiler({children}: AlanWakeSpoilerProps) {
  const [spoiled, setSpoiled] = useState(false);
  const [beingPressed, setBeingPressed] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);
  const [audioFile, setAudioFile] = useState<HTMLAudioElement>();
  const animationRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mainBodyRef = useRef<HTMLDivElement>();
  let elapsedTime = 0;

  useEffect(() => {
    setAudioFile(new Audio('/assets/gottt/aw2-enter.mp3'));

    if (!mainBodyRef.current) {
      mainBodyRef.current = document.querySelector<HTMLDivElement>('#main') ?? undefined;
    }
  }, []);

  useEffect(() => {
    if (!animationRef.current || !mainBodyRef.current || !buttonRef.current || !audioFile) {
      return;
    }

    if (beingPressed) {
      mainBodyRef.current.style.transformOrigin = `50% ${
        buttonRef.current.getBoundingClientRect().top + document.documentElement.scrollTop
      }px`;
      mainBodyRef.current.classList.add('alan-wake-spoiler--zoom');
      audioFile.play();
    } else {
      cancelAnimationFrame(animationRef.current);
      mainBodyRef.current.classList.remove('alan-wake-spoiler--zoom');
      previousTimeRef.current = undefined;
      elapsedTime = 0;
      audioFile.pause();
      audioFile.currentTime = 0;
    }
  }, [beingPressed]);

  useEffect(() => {
    if (spoiled && audioFile) {
      document.documentElement.setAttribute('data-theme', 'dark');
      videoRef.current?.play();
      audioFile.pause();
      audioFile.currentTime = 0;
    }
  }, [spoiled]);

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;

      elapsedTime = elapsedTime + deltaTime / 1000;
    }

    if (elapsedTime >= 3 && animationRef.current) {
      setBeingPressed(false);
      setSpoiled(true);
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
          [specificStyles['alan-wake-spoiler--spoiled']]: spoiled,
          [specificStyles['alan-wake-spoiler--pressing']]: beingPressed,
        }
      )}
    >
      <div
        className={clsx(specificStyles.video__container, {
          [specificStyles['video__container--visible']]: !videoFinished,
        })}
      >
        <video
          playsInline
          ref={videoRef}
          className={specificStyles.video}
          onTimeUpdate={() => {
            if (!videoRef.current) {
              return;
            }

            if (videoRef.current?.currentTime >= 19.4) {
              setVideoFinished(true);
            }
          }}
        >
          <source src="/assets/gottt/aw2-intro.mp4" type="video/mp4" />
        </video>
      </div>

      <div
        className={clsx(specificStyles.summary, {
          [specificStyles['summary--hidden']]: !videoFinished,
        })}
      >
        {children}
      </div>

      <button
        type="button"
        ref={buttonRef}
        className={clsx(styles.spoiler__button, specificStyles['spoiler__text--hold'])}
        onMouseDown={() => {
          if (getMobileOperatingSystem() !== OperatingSystem.Desktop) {
            setSpoiled(true);
            return;
          }

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
        <span className={clsx(styles.spoiler__text, specificStyles['spoiler__text--desktop'])}>
          Hold
        </span>
        <span className={clsx(styles.spoiler__text, specificStyles['spoiler__text--mobile'])}>
          Press
        </span>
        <FontAwesomeIcon icon={faEyeSlash} />
      </button>

      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        className={clsx(specificStyles['circular-progress'], {
          [specificStyles['circular-progress--animate']]: beingPressed,
        })}
      >
        <circle className={specificStyles['circular-progress__background']}></circle>
        <circle className={specificStyles['circular-progress__foreground']}></circle>
      </svg>
    </div>
  );
}
