import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

export function Figure({title, image, video, caption, left = false, right = false, sources = []}) {
  return (
    <figure
      className={clsx(styles.figure, {
        [styles['figure--left']]: left,
        [styles['figure--right']]: right,
      })}
    >
      {image ? (
        <picture>
          {sources.map((x) => (
            <source key={x.srcset} media={x.media} srcSet={x.srcset}></source>
          ))}
          <img
            src={`/assets/${image}`}
            title={title}
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

Figure.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      media: PropTypes.string,
      srcset: PropTypes.string.isRequired,
    })
  ),
  video: PropTypes.string,
  caption: PropTypes.string.isRequired,
  left: PropTypes.bool,
  right: PropTypes.bool,
};
