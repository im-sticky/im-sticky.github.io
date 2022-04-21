import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {Section} from 'components/Section';
import {getAllCrtClips} from 'helpers/postUtils.mjs';

import styles from 'styles/Crt.module.scss';

export default function Crt({clips}) {
  const getIndex = () => Math.floor(Math.random() * clips.length);
  const [currentClip, setCurrentClip] = useState(clips[getIndex()]);
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current?.load();
  }, [currentClip.slug]);

  const changeChannel = (e) => {
    e.preventDefault();
    setCurrentClip(clips[getIndex()]);
  };

  // TODO: show the volume bars on screen when clicking volume buttons

  if (!currentClip) {
    return null;
  }

  return (
    <Section grow id="crt">
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={clsx(styles.crt, styles['crt--on'])}>
            <div className={styles.screen}>
              <video autoPlay muted loop className={styles.video} ref={videoRef}>
                <source
                  src={`/crt/clips/${currentClip.slug}.${currentClip.mimetype}`}
                  type={`video/${currentClip.mimetype}`}
                />
              </video>
            </div>
            <div className={styles['channel-overlay']}>AV-1</div>
          </div>
        </div>

        <img src="/crt/crt.png" className={styles.image} alt="" useMap="#controls" />

        <map name="controls">
          {/* power */}
          <area coords="401,726,13" shape="circle" />
          {/* channel up */}
          <area coords="704,723,10" shape="circle" href="#" onClick={changeChannel} />
          {/* channel down */}
          <area coords="676,724,12" shape="circle" href="#" onClick={changeChannel} />
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
          <area coords="616,726,10" shape="circle" />
          {/* vol + */}
          <area coords="647,726,11" shape="circle" />
        </map>
      </div>
    </Section>
  );
}

export const getStaticProps = async () => {
  const clips = getAllCrtClips();

  return {props: {clips}};
};
