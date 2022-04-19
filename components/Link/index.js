import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from 'next/link';

import styles from './index.module.scss';

export function InternalLink({
  to,
  children,
  className,
  noUnderline = false,
  icon = false,
  ...props
}) {
  return (
    <Link href={to}>
      <a
        {...props}
        className={clsx(styles.link, className, {
          [styles['link--no-underline']]: noUnderline,
          [styles['link--icon']]: icon,
        })}
      >
        {children}
      </a>
    </Link>
  );
}

InternalLink.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
  noUnderline: PropTypes.bool,
  icon: PropTypes.bool,
};
