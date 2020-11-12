import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './index.scss';

export const Container = ({children, className}) =>
  <div className={classnames('container', className)}>
    {children}
  </div>;

Container.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};
