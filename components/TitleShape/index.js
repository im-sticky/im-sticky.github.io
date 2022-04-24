import React, {createElement} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import styles from './index.module.scss';

export function TitleShape({icon, alt, children, level = 1, small = false, className}) {
  return createElement(
    `h${level}`,
    {
      className: clsx(styles['title-shape-heading'], className),
    },
    <>
      {children}
      <div className={clsx(styles['title-shape'], {[styles['title-shape--small']]: small})}>
        <FontAwesomeIcon icon={icon} alt={alt} className={styles['title-shape-icon']} />
      </div>
    </>
  );
}

TitleShape.propTypes = {
  alt: PropTypes.string,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  icon: PropTypes.instanceOf(Object).isRequired,
  level: PropTypes.number,
  small: PropTypes.bool,
};
