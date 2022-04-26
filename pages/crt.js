import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {Section} from 'components/Section';
import {getAllCrtClips} from 'helpers/postUtils.mjs';

import styles from 'styles/Crt.module.scss';

const volumeIncrement = 10;

function shuffle(array) {
  return array
    .map((value) => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value);
}

function makeVolumeBars(volume) {
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

export default function Crt({clips}) {
  const [shuffledClips, _] = useState(shuffle(clips));
  const [currentClip, setCurrentClip] = useState(shuffledClips[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(100);
  const [volumeActive, setVolumeActive] = useState(false);
  const [crtOn, setCrtOn] = useState(false);
  const videoRef = useRef();
  const videoPositionRef = useRef();
  const containerRef = useRef();

  const resizeCrtVideo = () => {
    if (videoPositionRef.current && containerRef.current) {
      const pos = videoPositionRef.current.getBoundingClientRect();

      containerRef.current.style.top = `${pos.y}px`;
      containerRef.current.style.left = `${pos.x}px`;
      containerRef.current.style.width = `${pos.width * (4 / 3)}px`;
    }
  };

  // handle window resize
  useEffect(() => {
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
    setCurrentClip(shuffledClips[currentIndex]);
  }, [currentIndex]);

  // on power on/off
  useEffect(() => {
    if (crtOn) {
      videoRef.current.load();
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [crtOn]);

  // on volume change
  useEffect(() => {
    if (!crtOn) {
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
  const controlAction = (action, alwaysAllow = false) => {
    return (e) => {
      e.preventDefault();

      if (crtOn || alwaysAllow) {
        action();
      }
    };
  };

  const changeChannel = (direction) => () => {
    let next = currentIndex + direction;

    if (next < 0) {
      next = shuffledClips.length - 1;
    } else if (next >= shuffledClips.length) {
      next = 0;
    }

    setCurrentIndex(next);
  };

  const adjustVolume = (amount) => () => {
    let next = currentVolume + amount;

    if (next <= 100 && next >= 0) {
      setCurrentVolume(next);
    } else {
      setVolumeActive(true);
      setTimeout(() => setVolumeActive(false), 1200);
    }
  };

  // render
  return (
    <Section grow id="crt">
      <div className={styles.background}>
        <div className={styles.container} ref={containerRef}>
          <div className={clsx(styles.crt, {[styles['crt--on']]: crtOn})}>
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
          <a href="#power" onClick={controlAction(() => setCrtOn(!crtOn), true)}>
            <rect x="745" y="911" fill="#fff" opacity="0" width="35" height="35"></rect>
          </a>
          <a href="#voldown" onClick={controlAction(adjustVolume(-volumeIncrement))}>
            <rect x="1020" y="917" fill="#fff" opacity="0" width="25" height="25"></rect>
          </a>
          <a href="#volup" onClick={controlAction(adjustVolume(volumeIncrement))}>
            <rect x="1058" y="917" fill="#fff" opacity="0" width="25" height="25"></rect>
          </a>
          <a href="#chandown" onClick={controlAction(changeChannel(-1))}>
            <rect x="1096" y="917" fill="#fff" opacity="0" width="25" height="25"></rect>
          </a>
          <a href="#chanup" onClick={controlAction(changeChannel(1))}>
            <rect x="1134" y="916" fill="#fff" opacity="0" width="25" height="25"></rect>
          </a>
        </svg>
      </div>
    </Section>
  );
}

export const getStaticProps = async () => {
  const clips = getAllCrtClips();

  return {props: {clips, includeFooter: false}};
};
