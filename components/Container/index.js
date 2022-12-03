import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './index.module.scss';

export const Container = forwardRef(({children, className}, ref) => (
  <div ref={ref} className={clsx(styles.container, className)}>
    {children}
  </div>
));

Container.displayName = 'Container';
Container.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};
