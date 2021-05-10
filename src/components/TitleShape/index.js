import React, {createElement} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import styles from './index.scss';

export function TitleShape({icon, alt, children, level = 1, small = false, className}) {
  return createElement(
    `h${level}`,
    {
      className: classNames('title-shape-heading', className),
    },
    <>
      {children}
      <div className={classNames('title-shape', {'title-shape--small': small})}>
        <FontAwesomeIcon icon={icon} alt={alt} className='title-shape-icon' />
      </div>
    </>);
}

TitleShape.propTypes = {
  alt: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  icon: PropTypes.instanceOf(Object).isRequired,
  level: PropTypes.number,
  small: PropTypes.bool,
};