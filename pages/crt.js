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
        <div className={styles.container}>
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

        <img src="/crt/crt.png" className={styles.image} alt="" useMap="#controls" />

        <map name="controls">
          {/* power */}
          <area
            coords="401,726,13"
            shape="circle"
            href="#"
            onClick={controlAction(() => setCrtOn(!crtOn), true)}
          />
          {/* channel up */}
          <area
            coords="704,723,10"
            shape="circle"
            href="#"
            onClick={controlAction(changeChannel(1))}
          />
          {/* channel down */}
          <area
            coords="676,724,12"
            shape="circle"
            href="#"
            onClick={controlAction(changeChannel(-1))}
          />
          {/* stop */}
          <area coords="434,726,10" shape="circle" />
          {/* record */}
          <area coords="464,726,9" shape="circle" />
          {/* rewind */}
          <area coords="494,726,11" shape="circle" />
          {/* play/pause */}
          <area coords="524,726,14" shape="circle" />
          {/* fast forward */}
          <area coords="554,726,11" shape="circle" />
          {/* vol - */}
          <area
            coords="616,726,10"
            shape="circle"
            href="#"
            onClick={controlAction(adjustVolume(-volumeIncrement))}
          />
          {/* vol + */}
          <area
            coords="647,726,11"
            shape="circle"
            href="#"
            onClick={controlAction(adjustVolume(volumeIncrement))}
          />
        </map>
      </div>
    </Section>
  );
}

export const getStaticProps = async () => {
  const clips = getAllCrtClips();

  return {props: {clips}};
};
