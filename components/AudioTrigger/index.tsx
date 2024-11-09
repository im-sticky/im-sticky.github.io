'use client';

import React, {useState, useEffect} from 'react';

interface AudioTriggerProps {
  children: React.ReactNode;
  filePath: string;
}

export function AudioTrigger({children, filePath, ...props}: AudioTriggerProps) {
  const [audioEffect, setAudioEffect] = useState<HTMLAudioElement>();

  useEffect(() => {
    setAudioEffect(new Audio(filePath));
  }, []);

  return (
    <span
      {...props}
      onMouseEnter={() => {
        audioEffect?.play();
      }}
    >
      {children}
    </span>
  );
}
