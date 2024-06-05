import React, {createElement} from 'react';
import clsx from 'clsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import styles from './index.module.scss';

interface TitleShapeProps {
  children: any;
  className?: string;
  icon: IconProp;
  level?: number;
  small?: boolean;
}

export function TitleShape({icon, children, level = 1, small = false, className}: TitleShapeProps) {
  return createElement(
    `h${level}`,
    {
      className: clsx(styles['title-shape-heading'], className),
    },
    <>
      {children}
      <div className={clsx(styles['title-shape'], {[styles['title-shape--small']]: small})}>
        <FontAwesomeIcon icon={icon} className={styles['title-shape-icon']} />
      </div>
    </>
  );
}
