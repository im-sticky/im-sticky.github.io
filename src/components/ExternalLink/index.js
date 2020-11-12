import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'components/Link';

import styles from './index.scss';

export const ExternalLink = ({href, children, className, noIcon = false, ...props}) =>
  <Link {...props} target='_blank' rel='nofollow noreferrer noopener' href={href} className={classNames('external-link', className)}>
    {children} {!noIcon && <FontAwesomeIcon icon={faExternalLinkAlt} className='external-link__icon' />}
  </Link>;

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
  icon: PropTypes.bool,
}