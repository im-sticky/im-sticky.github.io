import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

export function ImageCard({imageSrc, title}) {
  return (
    <div className={styles.container}>
      <img src={`/assets/${imageSrc}`} className={styles.image} alt="" role="decorative" />
      <div className={styles.screen} />
      <p className={styles.title}>{title}</p>
    </div>
  );
}

ImageCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
