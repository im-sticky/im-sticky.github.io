import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

export enum TabLocation {
  Left,
  Middle,
  Right,
}

interface FolderProps {
  title?: string;
  tabLocation?: TabLocation;
  children?: React.ReactNode;
}

export function Folder({title, tabLocation = TabLocation.Right, children = null}: FolderProps) {
  return <div className={styles.folder}>{children}</div>;
}
