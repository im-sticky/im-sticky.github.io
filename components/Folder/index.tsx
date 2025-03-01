'use client';

import React, {Children, cloneElement, useState} from 'react';
import {FolderColor, TabLocation} from './enums';
import clsx from 'clsx';
import styles from './index.module.scss';

interface FolderProps {
  title?: string;
  subTitle?: string;
  tabLocation?: TabLocation;
  color?: FolderColor;
  children?: React.ReactElement | React.ReactElement[];
}

export function Folder({
  title,
  subTitle,
  tabLocation = TabLocation.Left,
  color = FolderColor.Blue,
  children,
}: FolderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const childrenArray = Children.toArray(children);

  return (
    <div
      className={clsx(styles.folder, styles[`folder--${color}`], styles[`folder--${tabLocation}`], {
        [styles['folder--open']]: isOpen,
      })}
    >
      <div className={styles.folder__tab}>
        {title ? <span className={styles['folder__tab-title']}>{title}</span> : null}
        {subTitle ? <span className={styles['folder__tab-sub-title']}>{subTitle}</span> : null}
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
