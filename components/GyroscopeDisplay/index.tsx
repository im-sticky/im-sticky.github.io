'use client';

import {useGyroscope} from '@hooks/useGyroscope';

export function GyroscopeDisplay() {
  const {gyro, error} = useGyroscope();

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <dl>
      <dt>Angular velocity</dt>
      <dd>
        X-axis: <strong>{gyro.x}</strong>
      </dd>
      <dd>
        Y-axis: <strong>{gyro.y}</strong>
      </dd>
      <dd>
        Z-axis: <strong>{gyro.z}</strong>
      </dd>
    </dl>
  );
}
