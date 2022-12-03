import React from 'react';
import clsx from 'clsx';
import {Section} from 'components/Section';
import {Container} from 'components/Container';
import {TitleShape} from 'components/TitleShape';
import {InternalLink} from 'components/Link';
import {PageHead} from 'components/PageHead';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGamepad, faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import sharedStyles from 'styles/Shared.module.scss';
import styles from 'styles/Pico.module.scss';

export default function Pico({carts}) {
  return (
    <>
      <PageHead
        url="pico-8"
        title="PICO-8 Carts"
        description="A collection of PICO-8 games and concept carts"
      />

      <Section grow className={styles['carts']}>
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
