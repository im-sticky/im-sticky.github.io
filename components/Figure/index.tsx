import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

interface FigureProps {
  title?: string;
  image?: string;
  sources?: {
    media?: string;
    srcset: string;
  }[];
  video?: string;
  caption: string;
  left?: boolean;
  right?: boolean;
  large?: boolean;
}

export function Figure({
  title,
  image,
  video,
  caption,
  left = false,
  right = false,
  large = false,
  sources = [],
}: FigureProps) {
  return (
    <figure
      className={clsx(styles.figure, {
        [styles['figure--left']]: left,
        [styles['figure--right']]: right,
        [styles['figure--large']]: large,
      })}
    >
      {image ? (
        <picture>
          {sources.map((x) => (
            <source key={x.srcset} media={x.media} srcSet={x.srcset}></source>
          ))}
          <img
            src={`/assets/${image}`}
            title={title ?? caption}
            alt={title}
            className={styles.object}
            loading="lazy"
          />
        </picture>
      ) : null}

      {video ? (
        <video controls playsInline className={styles.object}>
          <source src={`/assets/${video}`} type={`video/${video.split('.').pop()}`} />
        </video>
      ) : null}

      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
