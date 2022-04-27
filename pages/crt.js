import React, {useEffect, useRef, useState} from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import {Section} from 'components/Section';
import {getAllCrtClips} from 'helpers/postUtils.mjs';
import {SITE_URL} from 'helpers/constants';

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
  const [shuffledClips, setShuffledClips] = useState();
  const [currentClip, setCurrentClip] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(100);
  const [volumeActive, setVolumeActive] = useState(false);
  const [crtOn, setCrtOn] = useState(false);
  const [audioEffects, setAudioEffects] = useState();
  const videoPositionRef = useRef();
  const containerRef = useRef();
  const screenRef = useRef();
  const videoRef = useRef();

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
  const controlAction = (action, sound, alwaysAllow = false) => {
    return (e) => {
      e.preventDefault();

      if (crtOn || alwaysAllow) {
        action();
      }

      sound.play();
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
    <>
      <Head>
        <title>Alex Craig | CRT.tv</title>

        <meta property="og:site_name" content="Alex Craig's Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/crt`} />
        <meta property="og:title" content="CRT.tv" />
        <meta
          property="og:description"
          content="A CRT that displays game clips on different channels"
        />
        <meta property="og:image" content="/mstile-144x144.png" />

        <meta name="twitter:site" content="@im_sticky" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={`${SITE_URL}/crt`} />
        <meta name="twitter:title" content="CRT.tv" />
        <meta
          name="twitter:description"
          content="A CRT that displays game clips on different channels"
        />
        <meta name="twitter:image" content="/mstile-144x144.png" />
      </Head>

      <Section grow id="crt" className={styles.section}>
        <div className={styles.background}>
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
        </div>
      </Section>
    </>
  );
}

export const getStaticProps = async () => {
  const clips = getAllCrtClips();

  return {props: {clips, includeFooter: false}};
};
