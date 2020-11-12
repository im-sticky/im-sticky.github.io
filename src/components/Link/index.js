import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './index.scss';

export const Link = ({href, children, className, noUnderline = false, ...props}) =>
  <a {...props} href={href} className={classNames('link', className, {
    'link--no-underline': noUnderline,
  })}>
    {children}
  </a>;

Link.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
  noUnderline: PropTypes.bool,
}