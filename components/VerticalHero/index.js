import React, {useEffect, useRef} from 'react';
import {Container} from 'components/Container';
import styles from './index.module.scss';

export function VerticalHero({children, imageUrl, scrollTarget = 600}) {
  const heroContainerRef = useRef();
  const heroScreenRef = useRef();
  const heroTitleRef = useRef();
  const heroImageRef = useRef();

  const adjustHeroPosition = (always = false) => {
    const position = Math.min((window.pageYOffset / scrollTarget) * 100, 101);

    if (
      heroContainerRef.current &&
      heroScreenRef.current &&
      heroTitleRef.current &&
      heroImageRef.current &&
      (position <= 100 || always)
    ) {
      const percent = position / 100;

      heroScreenRef.current.style.backgroundImage = `linear-gradient(to left, rgb(250, 250, 250) ${position}%, rgba(250, 250, 250, 0) ${
        position * 1.3 + 25
      }%, rgba(250, 250, 250, 0))`;
      heroImageRef.current.style.objectPosition = `50% ${position}%`;
      heroContainerRef.current.style.transform = `translateX(-${61 * percent}%)`;
      heroTitleRef.current.style.marginTop = `${
        (heroContainerRef.current.getBoundingClientRect().height -
          heroTitleRef.current.getBoundingClientRect().height) *
        percent
      }px`;
    }
  };

  useEffect(() => {
    adjustHeroPosition(true);
    window.addEventListener('scroll', () => adjustHeroPosition());
  }, []);

  return (
    <>
      <div className={styles['vertical-hero__splash']}>
        <img
          className={styles['vertical-hero__image']}
          src={imageUrl}
          role="presentation"
          ref={heroImageRef}
        />
        <div className={styles['vertical-hero__screen']} ref={heroScreenRef} />
      </div>
      <div className={styles['vertical-hero']}>
        <div className={styles['vertical-hero__container']} ref={heroContainerRef}>
          <Container ref={heroTitleRef}>{children}</Container>
        </div>
      </div>
    </>
  );
}
