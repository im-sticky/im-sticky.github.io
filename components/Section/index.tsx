import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  grow?: boolean;
}

export function Section({children, className, grow = false}: SectionProps) {
  return (
    <section className={clsx(styles.section, className, {[styles['section--grow']]: grow})}>
      {children}
    </section>
  );
}
