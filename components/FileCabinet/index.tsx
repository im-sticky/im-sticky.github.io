import React, {Children, cloneElement} from 'react';
import clsx from 'clsx';
import {Folder} from '@components/Folder';
import styles from './index.module.scss';

interface FileCabinetProps {
  children: React.ReactElement<typeof Folder> | React.ReactElement<typeof Folder>[];
}

export function FileCabinet({children}: FileCabinetProps) {
  const childrenArray = Children.toArray(children);

  return (
    <div className={styles['file-cabinet']}>
      {Children.map(childrenArray, (child, index) =>
        // @ts-ignore
        cloneElement(child, {
          style: {'--index': index, '--reverse-index': childrenArray.length - index - 1},
        })
      )}
    </div>
  );
}
