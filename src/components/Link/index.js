import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './index.scss';

export const Link = ({href, to, children, className, noUnderline = false, icon = false, ...props}) =>
  <a {...props} href={to ? `/#${to}` : href} className={classNames('link', className, {
    'link--no-underline': noUnderline,
    'link--icon': icon,
  })}>
    {children}
  </a>;

Link.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
  noUnderline: PropTypes.bool,
  icon: PropTypes.bool,
}