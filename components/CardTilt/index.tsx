// @ts-nocheck

'use client';

import {useState} from 'react';
import {useDeviceOrientation} from '@hooks/useDeviceOrientation';
import styles from './index.module.scss';
import {Polaroid} from '@components/Polaroid';

interface CardTiltProps {
  maxTilt?: number;
}

export function CardTilt({maxTilt = 30}: CardTiltProps) {
  const {orientation, error} = useDeviceOrientation();

  if (error) {
    return <p style={{color: 'red'}}>{error}</p>;
  }

  const tiltX = Math.max(-maxTilt, Math.min(maxTilt, orientation.beta));
  const tiltY = Math.max(-maxTilt, Math.min(maxTilt, orientation.gamma));

  return (
    <div
      className={styles['card-container']}
      style={{transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`}}
    >
      <Polaroid imagePath="goty-share.png" caption="Tilt your device around" />
    </div>
  );
}
