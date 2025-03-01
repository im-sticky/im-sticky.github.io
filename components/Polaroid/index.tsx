import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

interface PolaroidProps {
  imagePath: string;
  caption?: string;
}

export function Polaroid({imagePath, caption, ...props}: PolaroidProps) {
  return (
    <figure className={styles.polaroid} {...props}>
      <picture className={styles.polaroid__picture}>
        <img src={`/assets/${imagePath}`} alt={caption} />
      </picture>

      <figcaption className={styles.polaroid__caption}>{caption ?? <span>&nbsp;</span>}</figcaption>
    </figure>
  );
}
