'use client';

import React, {Children, cloneElement, useState} from 'react';
import {FolderColor, TabLocation} from './enums';
import clsx from 'clsx';
import styles from './index.module.scss';

interface FolderProps {
  title?: string;
  subTitle?: string;
  strikethrough?: boolean;
  tabLocation?: TabLocation;
  color?: FolderColor;
  children?: React.ReactElement | React.ReactElement[];
}

export function Folder({
  title,
  subTitle,
  strikethrough = false,
  tabLocation = TabLocation.Left,
  color = FolderColor.Blue,
  children,
  ...props
}: FolderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const childrenArray = Children.toArray(children);

  return (
    <div
      className={clsx(styles.folder, styles[`folder--${color}`], styles[`folder--${tabLocation}`], {
        [styles['folder--open']]: isOpen,
      })}
      onMouseLeave={() => setIsOpen(false)}
      {...props}
    >
      <div className={styles.folder__tab}>
        {title ? (
          <span
            className={clsx(styles['folder__tab-title'], {
              [styles['strikethrough']]: strikethrough,
            })}
          >
            {title}
          </span>
        ) : null}
        {subTitle ? (
          <span
            className={clsx(styles['folder__tab-sub-title'], {
              [styles['strikethrough']]: strikethrough,
            })}
          >
            {subTitle}
          </span>
        ) : null}
      </div>

      <div className={styles.folder__contents}>
        {Children.map(childrenArray, (child, index) =>
          // @ts-ignore
          cloneElement(child, {
            style: {'--index': index, '--reverse-index': childrenArray.length - index - 1},
          })
        )}
      </div>

      <div className={styles.folder__front} onClick={() => setIsOpen(!isOpen)}></div>
    </div>
  );
}
