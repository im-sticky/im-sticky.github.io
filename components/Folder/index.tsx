import React, {Children, cloneElement} from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

export enum TabLocation {
  Left,
  Right,
}

interface FolderProps {
  title?: string;
  subTitle?: string;
  tabLocation?: TabLocation;
  children?: React.ReactElement | React.ReactElement[];
}

export function Folder({title, subTitle, tabLocation = TabLocation.Left, children}: FolderProps) {
  const childrenArray = Children.toArray(children);
  return (
    <div
      className={clsx(styles.folder, {
        [styles['folder--left']]: tabLocation === TabLocation.Left,
        [styles['folder--right']]: tabLocation === TabLocation.Right,
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
      <div className={styles.folder__front}></div>
    </div>
  );
}
