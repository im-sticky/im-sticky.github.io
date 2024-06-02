import React from 'react';
import clsx from 'clsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  noUnderline?: boolean;
  noIcon?: boolean;
}

export function ExternalLink({
  href,
  children,
  className,
  noIcon = false,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="nofollow noreferrer noopener"
      className={clsx(styles['external-link'], className)}
    >
      {children}
      {!noIcon && (
        <>
          {' '}
          <FontAwesomeIcon
            {...props}
            icon={faExternalLinkAlt}
            className={clsx(styles['external-link__icon'], className)}
          />
        </>
      )}
    </a>
  );
}
