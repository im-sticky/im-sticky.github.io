import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'components/Link';

import styles from './index.scss';

export const ExternalLinkIcon = ({className, ...props}) =>
  <FontAwesomeIcon {...props} icon={faExternalLinkAlt} className={classNames('external-link__icon', className)} />;

ExternalLinkIcon.propTypes = {
  className: PropTypes.string,
};

export const ExternalLink = ({href, children, className, noIcon = false, ...props}) =>
  <Link {...props} target='_blank' rel='nofollow noreferrer noopener' href={href} className={classNames('external-link', className)}>
    {children} {!noIcon && <ExternalLinkIcon />}
  </Link>;

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
  icon: PropTypes.bool,
}