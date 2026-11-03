import {useCallback, useEffect, useState} from 'react';
import {getMobileOperatingSystem, OperatingSystem} from '@helpers/checkMobileBrowser';

type Orientation = {alpha: number; beta: number; gamma: number};
type Permission = 'granted' | 'denied' | null;
type DeviceOrientationEventIOS = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<Permission>;
};

export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<Orientation>({alpha: 0, beta: 0, gamma: 0});
  const [error, setError] = useState<string | null>(null);
  const [permission, setPermission] = useState<Permission>('granted');

  useEffect(() => {
    if (!('DeviceOrientationEvent' in window)) {
      setError('DeviceOrientationEvent API not supported');
      return;
    }

    const OrientationEvent = DeviceOrientationEvent as DeviceOrientationEventIOS;

    setPermission(
      typeof OrientationEvent.requestPermission === 'function' &&
        getMobileOperatingSystem() === OperatingSystem.Ios
        ? null
        : 'granted',
    );

    const onOrientation = (e: DeviceOrientationEvent) => {
      setOrientation({
        alpha: Number(e.alpha?.toFixed(2) ?? 0),
        beta: Number(e.beta?.toFixed(2) ?? 0),
        gamma: Number(e.gamma?.toFixed(2) ?? 0),
      });
    };

    window.addEventListener('deviceorientation', onOrientation);

    return () => {
      window.removeEventListener('deviceorientation', onOrientation);
    };
  }, []);

  const requestPermission = useCallback(async () => {
    const OrientationEvent = DeviceOrientationEvent as DeviceOrientationEventIOS;

    if (typeof OrientationEvent.requestPermission !== 'function') {
      setPermission('granted');
      return;
    }

    try {
      const result = await OrientationEvent.requestPermission();
      setPermission(result);

      if (result === 'denied') {
        setError('Permission to access device orientation was denied');
      }
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  return {orientation, error, permission, requestPermission};
}
