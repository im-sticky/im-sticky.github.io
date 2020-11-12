import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './index.scss';

export const Section = ({children, id, className, grow = false}) =>
  <section id={id} className={classnames('section', className, {'section--grow': grow})}>
    {children}
  </section>;

Section.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  grow: PropTypes.bool,
  id: PropTypes.string.isRequired,
};
