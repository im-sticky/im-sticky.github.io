import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './index.module.scss';

export function Container({children, className}) {
  return <div className={clsx(styles.container, className)}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};
