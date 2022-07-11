import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from 'next/link';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';

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

export function ExternalLink({href, children, className, noIcon = false, ...props}) {
  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="nofollow noreferrer noopener"
      to={href}
      className={clsx(styles.link, styles['external-link'], className)}
    >
      {children}
      {!noIcon && (
        <>
          {' '}
          <FontAwesomeIcon
            {...props}
            icon={faExternalLinkAlt}
            className={clsx(styles['external-link__icon'], className)}
          />
        </>
      )}
    </a>
  );
}

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
  icon: PropTypes.bool,
};
