import React from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import {Section} from 'components/Section';
import {Container} from 'components/Container';
import {TitleShape} from 'components/TitleShape';
import {InternalLink} from 'components/Link';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGamepad, faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import {SITE_URL} from 'helpers/constants';
import sharedStyles from 'styles/Shared.module.scss';
import styles from 'styles/Pico.module.scss';

export default function Pico({carts}) {
  return (
    <>
      <Head>
        <title>Alex Craig | PICO-8 Carts</title>

        <meta property="og:site_name" content="Alex Craig's Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/pico-8`} />
        <meta property="og:title" content="PICO-8 Carts" />
        <meta property="og:description" content="A collection of PICO-8 games and concept carts" />
        <meta property="og:image" content="/mstile-144x144.png" />

        <meta name="twitter:site" content="@im_sticky" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={`${SITE_URL}/pico-8`} />
        <meta name="twitter:title" content="PICO-8 Carts" />
        <meta name="twitter:description" content="A collection of PICO-8 games and concept carts" />
        <meta name="twitter:image" content="/mstile-144x144.png" />
      </Head>

      <Section grow id="Pico-8" className={styles['carts']}>
        <Container>
          <p
            className={clsx(
              sharedStyles['page__descriptor'],
              sharedStyles['page__descriptor--small'],
              sharedStyles['page__descriptor--spaced']
            )}
          >
            <InternalLink icon to="/projects">
              <FontAwesomeIcon
                icon={faLongArrowAltLeft}
                className={sharedStyles['page__back-icon']}
              />
              Back to projects
            </InternalLink>
          </p>
          <TitleShape icon={faGamepad}>PICO-8 Carts</TitleShape>
          <p className={sharedStyles['page__descriptor']}>
            A collection of PICO-8 games and concept carts I have made. Carts are functional on
            mobile and all code is publicly available.
          </p>

          <div className={styles.carts__list}>
            {carts.map((cart) => (
              <div key={cart.pid} className={styles.carts__item}>
                <a
                  href={`https://www.lexaloffle.com/bbs/cart_info.php?cid=${cart.pid}`}
                  className={styles.carts__link}
                  target="_blank"
                  rel="nofollow noreferrer noopener"
                >
                  <img src={cart.img} alt={cart.name} className={styles.carts__img} />
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      carts: [
        {
          pid: 'maze_descent-1',
          name: 'Descent',
          img: 'https://www.lexaloffle.com/bbs/cposts/ma/maze_descent-1.p8.png',
        },
        {
          pid: 'sliddy',
          name: 'Sliddy Returns',
          img: 'https://www.lexaloffle.com/bbs/cposts/sl/sliddy-1.p8.png',
        },
        {
          pid: 'alphamask',
          name: 'Alpha masking example',
          img: 'https://www.lexaloffle.com/bbs/cposts/al/alphamask-0.p8.png',
        },
      ],
    },
  };
};
