'use client';

import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {InternalLink} from '@components/InternalLink';
import {debounce} from '@helpers/debounce';
import styles from './index.module.scss';

export function TableOfContents({}) {
  const [headings, setHeadings] = useState<HTMLHeadingElement[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');

  useEffect(() => {
    const headingNodes = [...document.querySelectorAll<HTMLHeadingElement>('h2, h3, h4, h5, h6')];
    headingNodes.forEach((el) => {
      // @ts-ignore
      el.id = el.textContent
        .toLowerCase()
        .replaceAll(' ', '-')
        .replaceAll(/[^a-zA-Z\d\-]/g, '');
    });

    setHeadings(headingNodes);
  }, []);

  useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    const scrollEvent = debounce(() => {
      const closestHeading = headings.reduce((prev, current) =>
        Math.abs(prev?.getBoundingClientRect().top ?? 0) <
        Math.abs(current.getBoundingClientRect().top)
          ? prev
          : current
      );

      setActiveHeadingId(closestHeading.id);
    }, 16);

    window.addEventListener('scroll', scrollEvent);

    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [headings.length]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className={styles.contents}>
      <p className={styles.heading}>Table of Contents</p>

      <ul className={styles.contents__list}>
        {headings.map((el) => (
          <li
            key={el.id}
            className={clsx(styles.contents__item, {
              [styles['contents__item--h3']]: el.tagName.toLowerCase() == 'h3',
              [styles['contents__item--h4']]: el.tagName.toLowerCase() == 'h4',
              [styles['contents__item--h5']]: el.tagName.toLowerCase() == 'h5',
              [styles['contents__item--h6']]: el.tagName.toLowerCase() == 'h6',
            })}
          >
            <InternalLink to={`#${el.id}`} active={el.id === activeHeadingId}>
              {el.textContent}
            </InternalLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
