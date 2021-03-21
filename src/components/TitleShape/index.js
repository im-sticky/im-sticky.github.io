import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import styles from './index.scss';

export function TitleShape({icon, alt, small = false}) {
  return <div className={classNames('title-shape', {'title-shape--small': small})}>
    <FontAwesomeIcon icon={icon} alt={alt} className='title-shape-icon' />
  </div>;
}

TitleShape.propTypes = {
  icon: PropTypes.instanceOf(Object).isRequired,
  alt: PropTypes.string.isRequired,
  small: PropTypes.bool,
};