import {useEffect, useState} from 'react';

type Reading = {x: number; y: number; z: number};

export function useGyroscope(frequency = 60, decimals = 2) {
  const [gyro, setGyro] = useState<Reading>({x: 0, y: 0, z: 0});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!('Gyroscope' in window)) {
      setError('Gyroscope API not supported');
      return;
    }

    let gyroscope: Gyroscope;

    try {
      gyroscope = new Gyroscope({frequency});
    } catch (err) {
      setError((err as Error).message);
      return;
    }

    const onReading = () =>
      setGyro({
        x: Number((gyroscope.x ?? 0).toFixed(decimals)),
        y: Number((gyroscope.y ?? 0).toFixed(decimals)),
        z: Number((gyroscope.z ?? 0).toFixed(decimals)),
      });
    const onError = (e: Event) => setError((e as SensorErrorEvent).error.message);

    gyroscope.addEventListener('reading', onReading);
    gyroscope.addEventListener('error', onError);
    gyroscope.start();

    return () => {
      gyroscope.removeEventListener('reading', onReading);
      gyroscope.removeEventListener('error', onError);
      gyroscope.stop();
    };
  }, [frequency]);

  return {gyro, error};
}
