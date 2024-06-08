import React, {forwardRef} from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  large?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({children, className, large = false}: ContainerProps, ref) => (
    <div
      ref={ref}
      className={clsx(styles.container, className, {[styles['container--large']]: large})}
    >
      {children}
    </div>
  )
);

Container.displayName = 'Container';
