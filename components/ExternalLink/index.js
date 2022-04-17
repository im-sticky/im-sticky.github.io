import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';
import {InternalLink} from 'components/Link';

import styles from './index.module.scss';

export function ExternalLink({href, children, className, noIcon = false, ...props}) {
  return (
    <InternalLink
      {...props}
      target="_blank"
      rel="nofollow noreferrer noopener"
      to={href}
      className={clsx(styles['external-link'], className)}
    >
      {children}{' '}
      {!noIcon && (
        <FontAwesomeIcon
          {...props}
          icon={faExternalLinkAlt}
          className={clsx(styles['external-link__icon'], className)}
        />
      )}
    </InternalLink>
  );
}

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
  icon: PropTypes.bool,
};
