import React from 'react';
import styles from './index.module.scss';

interface ImageCardProps {
  imageSrc: string;
  title: string;
}

export function ImageCard({imageSrc, title}: ImageCardProps) {
  return (
    <div className={styles.container}>
      <img src={`/assets/${imageSrc}`} className={styles.image} alt="" role="decorative" />
      <div className={styles.screen} />
      <p className={styles.title}>{title}</p>
    </div>
  );
}
