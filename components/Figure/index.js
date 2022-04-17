import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

export function Figure({title, file, caption}) {
  return (
    <figure className={styles.figure}>
      <img src={`/assets/${file}`} title={title} alt={title} className={styles.image} />
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}

Figure.propTypes = {
  title: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
