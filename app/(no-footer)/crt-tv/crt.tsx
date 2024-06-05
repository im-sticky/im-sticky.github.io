'use client';

import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {ICrtClip} from '@models/crtClip';
import styles from './index.module.scss';

interface IAudioEffects {
  power: {
    on: HTMLAudioElement;
    off: HTMLAudioElement;
  };
  channel: HTMLAudioElement;
  volume: HTMLAudioElement;
}

interface CrtProps {
  clips: ICrtClip[];
}

const volumeIncrement = 10;

function shuffle(array: ICrtClip[]): ICrtClip[] {
  return array
    .map((value) => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value);
}

function makeVolumeBars(volume: number) {
  let bars = [];

  for (let i = 1; i <= 100 / volumeIncrement; i++) {
    bars.push(
      <span
        key={`vb.${i}`}
        className={clsx(styles['volume-bar'], {
          [styles['volume-bar--active']]: i * volumeIncrement <= volume,
        })}
      />
    );
  }

  return bars;
}

export function Crt({clips}: CrtProps) {
  const [shuffledClips, setShuffledClips] = useState<ICrtClip[]>();
  const [currentClip, setCurrentClip] = useState<ICrtClip>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentVolume, setCurrentVolume] = useState<number>(100);
  const [volumeActive, setVolumeActive] = useState<boolean>(false);
  const [crtOn, setCrtOn] = useState<boolean>(false);
  const [audioEffects, setAudioEffects] = useState<IAudioEffects>();
  const videoPositionRef = useRef<SVGRectElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const resizeCrtVideo = () => {
    if (videoPositionRef.current && containerRef.current && screenRef.current) {
      const pos = videoPositionRef.current.getBoundingClientRect();

      containerRef.current.style.top = `${pos.y}px`;
      containerRef.current.style.left = `${pos.x}px`;
      screenRef.current.style.width = `${pos.width * (4 / 3)}px`;
      screenRef.current.style.height = `${pos.height}px`;
    }
  };

  // handle window resize
  useEffect(() => {
    setAudioEffects({
      power: {
        on: new Audio('/crt/power_on.mp3'),
        off: new Audio('/crt/power_off.mp3'),
      },
      channel: new Audio('/crt/channel_change.mp3'),
      volume: new Audio('/crt/volume_change.mp3'),
    });

    const shuffled = shuffle(clips);

    setShuffledClips(shuffled);
    setCurrentClip(shuffled[currentIndex]);

    resizeCrtVideo();
    window.addEventListener('resize', resizeCrtVideo);

    return () => window.removeEventListener('resize', resizeCrtVideo);
  }, []);

  // on clip change
  useEffect(() => {
    if (currentClip) {
      videoRef.current?.load();

      if (crtOn) {
        videoRef.current?.play();
      }
    }
  }, [currentClip?.slug]);

  // on change channel
  useEffect(() => {
    if (shuffledClips) {
      setCurrentClip(shuffledClips[currentIndex]);
    }
  }, [currentIndex]);

  // on power on/off
  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    if (crtOn) {
      videoRef.current.load();
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [crtOn]);

  // on volume change
  useEffect(() => {
    if (!crtOn || !videoRef.current) {
      return;
    }

    if (currentVolume >= 0 && currentVolume <= 100) {
      videoRef.current.volume = currentVolume / 100;
    }

    setVolumeActive(true);

    const timeout = setTimeout(() => setVolumeActive(false), 1200);

    return () => clearTimeout(timeout);
  }, [currentVolume]);

  // helpers
  const controlAction = (
    action: Function,
    sound?: HTMLAudioElement,
    alwaysAllow: boolean = false
  ) => {
    return (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();

      if (crtOn || alwaysAllow) {
        action();
      }

      sound?.play();
    };
  };

  const changeChannel = (direction: number) => () => {
    if (!shuffledClips) {
      return;
    }

    let next = currentIndex + direction;

    if (next < 0) {
      next = shuffledClips.length - 1;
    } else if (next >= shuffledClips.length) {
      next = 0;
    }

    setCurrentIndex(next);
  };

  const adjustVolume = (amount: number) => () => {
    let next = currentVolume + amount;

    if (next <= 100 && next >= 0) {
      setCurrentVolume(next);
    } else {
      setVolumeActive(true);
      setTimeout(() => setVolumeActive(false), 1200);
    }
  };

  return (
    <>
      <div className={styles.container} ref={containerRef}>
        <div className={clsx(styles.crt, {[styles['crt--on']]: crtOn})} ref={screenRef}>
          <div className={styles.screen}>
            <video loop className={styles.video} ref={videoRef}>
              <source
                src={`/crt/clips/${currentClip?.slug}.${currentClip?.mimetype}`}
                type={`video/${currentClip?.mimetype}`}
              />
            </video>
          </div>
          <div className={styles['channel-overlay']}>AV-1</div>
          <div
            className={clsx(styles['volume-overlay'], {
              [styles['volume-overlay--active']]: volumeActive,
            })}
          >
            {makeVolumeBars(currentVolume)}
          </div>
        </div>
      </div>

      <video autoPlay loop muted className={styles.video__overlay}>
        <source src="/crt/transparent-screen-crt.webm" type="video/webm" />
      </video>

      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className={styles['controls-map']}
      >
        <rect
          ref={videoPositionRef}
          x="589"
          y="141"
          fill="#fff"
          opacity="0"
          width="704"
          height="530"
        ></rect>
        <a
          href="#power"
          onClick={controlAction(
            () => setCrtOn(!crtOn),
            crtOn ? audioEffects?.power.off : audioEffects?.power.on,
            true
          )}
        >
          <rect x="745" y="911" fill="#fff" opacity="0" width="35" height="35"></rect>
        </a>
        <a
          href="#voldown"
          onClick={controlAction(adjustVolume(-volumeIncrement), audioEffects?.volume)}
        >
          <rect x="1020" y="917" fill="#fff" opacity="0" width="25" height="25"></rect>
        </a>
        <a
          href="#volup"
          onClick={controlAction(adjustVolume(volumeIncrement), audioEffects?.volume)}
        >
          <rect x="1058" y="917" fill="#fff" opacity="0" width="25" height="25"></rect>
        </a>
        <a href="#chandown" onClick={controlAction(changeChannel(-1), audioEffects?.channel)}>
          <rect x="1096" y="917" fill="#fff" opacity="0" width="25" height="25"></rect>
        </a>
        <a href="#chanup" onClick={controlAction(changeChannel(1), audioEffects?.channel)}>
          <rect x="1134" y="916" fill="#fff" opacity="0" width="25" height="25"></rect>
        </a>
      </svg>
    </>
  );
}
