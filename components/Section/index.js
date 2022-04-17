import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './index.module.scss';

export function Section({children, id, className, grow = false}) {
  return (
    <section id={id} className={clsx(styles.section, className, {[styles['section--grow']]: grow})}>
      {children}
    </section>
  );
}

Section.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  grow: PropTypes.bool,
  id: PropTypes.string.isRequired,
};
