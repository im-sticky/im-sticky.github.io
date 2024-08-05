'use client';

import React, {useRef, useState} from 'react';
import clsx from 'clsx';
import {IEdhCard} from '@models/edhCard';
import styles from './cardZoom.module.scss';

enum ImageSize {
  Small,
  Large,
}

interface CardZoomProps {
  card: IEdhCard;
  className?: string;
}

export function CardZoom({card, className}: CardZoomProps) {
  const [imageSize, setImageSize] = useState<ImageSize>(ImageSize.Small);
  const pictureRef = useRef<HTMLDivElement>(null);
  const largeImgRef = useRef<HTMLImageElement>(null);

  return (
    <figure className={clsx(styles.container, className)}>
      <div
        ref={pictureRef}
        className={styles.picture}
        onMouseEnter={() => {
          setImageSize(ImageSize.Large);
        }}
        onMouseLeave={() => {
          setImageSize(ImageSize.Small);
        }}
        onMouseMove={(e: React.MouseEvent) => {
          e.preventDefault();

          if (!pictureRef.current || !largeImgRef.current) {
            return;
          }

          const pictureRect = pictureRef.current.getBoundingClientRect();
          const imgRect = largeImgRef.current.getBoundingClientRect();
          const leftPercent = (e.clientX - pictureRect.left) / pictureRect.width;
          const topPercent = (e.clientY - pictureRect.top) / pictureRect.height;
          const left = leftPercent * imgRect.width - leftPercent * pictureRect.width;
          const top = topPercent * imgRect.height - topPercent * pictureRect.height;

          largeImgRef.current.style.left = `-${Math.round(left)}px`;
          largeImgRef.current.style.top = `-${Math.round(top)}px`;
        }}
      >
        <img
          src={`/edh/small/${card.imageName}`}
          title={card.name}
          alt={card.name}
          className={clsx(styles.image, styles['image--small'])}
          loading="lazy"
        />
        <img
          ref={largeImgRef}
          src={`/edh/large/${card.imageName}`}
          alt={`${card.name} zoomed in`}
          className={clsx(styles.image, styles['image--large'], {
            hidden: imageSize !== ImageSize.Large,
          })}
          loading="lazy"
        />
      </div>

      <figcaption className={styles.name}>{card.name}</figcaption>

      {card.acquired ? (
        <p>
          <strong>Location:</strong> {card.acquired ?? 'Forgotten'}
        </p>
      ) : null}

      {card.year ? (
        <p>
          <strong>Year:</strong> {card.year}
          {card.yearUnknown ? <sup>*</sup> : null}
        </p>
      ) : null}

      {card.description ? <p>{card.description}</p> : null}

      {card.yearUnknown ? (
        <small>
          <sup>*</sup>Uncertain of exact year
        </small>
      ) : null}
    </figure>
  );
}
