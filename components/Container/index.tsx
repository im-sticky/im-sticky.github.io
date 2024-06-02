import React, {forwardRef} from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({children, className}: ContainerProps, ref) => (
    <div ref={ref} className={clsx(styles.container, className)}>
      {children}
    </div>
  )
);

Container.displayName = 'Container';
