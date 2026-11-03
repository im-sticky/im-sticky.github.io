'use client';

import {useState} from 'react';
import {useDeviceOrientation} from '@hooks/useDeviceOrientation';
import styles from './index.module.scss';

export function DeviceOrientationDisplay() {
  const {orientation, permission, requestPermission} = useDeviceOrientation();
  const [showInfo, setShowInfo] = useState<boolean>(false);

  return (
    <>
      {permission !== 'granted' ? (
        <button type="button" className={styles['info-button']} onClick={requestPermission}>
          Enable Device Orientation
        </button>
      ) : null}

      <button
        type="button"
        className={styles['info-button']}
        onClick={() => setShowInfo(!showInfo)}
      >
        Toggle Orientation Info
      </button>

      {showInfo ? (
        <dl>
          <dt>Orientation</dt>
          <dd>
            Alpha (Z-axis): <strong>{orientation.alpha}</strong>
          </dd>
          <dd>
            Beta (X-axis): <strong>{orientation.beta}</strong>
          </dd>
          <dd>
            Gamma (Y-axis): <strong>{orientation.gamma}</strong>
          </dd>
        </dl>
      ) : null}
    </>
  );
}
