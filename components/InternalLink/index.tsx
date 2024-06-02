import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import styles from './index.module.scss';

interface InternalLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  noUnderline?: boolean;
  icon?: boolean;
  active?: boolean;
  newTab?: boolean;
}

export function InternalLink({
  to,
  children,
  className,
  noUnderline = false,
  icon = false,
  active = false,
  newTab = false,
  ...props
}: InternalLinkProps) {
  return (
    <Link
      href={to}
      target={newTab ? '_blank' : undefined}
      {...props}
      className={clsx(styles.link, className, {
        [styles['link--no-underline']]: noUnderline,
        [styles['link--icon']]: icon,
        [styles['link--active']]: active,
      })}
    >
      {children}
    </Link>
  );
}
