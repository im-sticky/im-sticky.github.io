'use client';

import React, {useRef} from 'react';

interface AudioTriggerProps {
  children: React.ReactNode;
  filePath: string;
}

export function AudioTrigger({children, filePath, ...props}: AudioTriggerProps) {
  const audioEffect = useRef<HTMLAudioElement>(new Audio(filePath));

  return (
    <span
      {...props}
      onMouseEnter={() => {
        audioEffect.current.play();
      }}
    >
      {children}
    </span>
  );
}
