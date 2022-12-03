import {Section} from 'components/Section';
import {Container} from 'components/Container';
import {InternalLink} from 'components/Link';
import {ExternalLink} from 'components/Link';
import {TitleShape} from 'components/TitleShape';
import {faTerminal, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {SITE_URL} from 'helpers/constants';
import Head from 'next/head';
import styles from 'styles/Home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Alex Craig | Home</title>

        <meta property="og:site_name" content="Alex Craig's Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}`} />
        <meta property="og:title" content="Home" />
        <meta property="og:description" content="Portfolio website of Alex Craig." />
        <meta property="og:image" content="/mstile-144x144.png" />

        <meta name="twitter:site" content="@im_sticky" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={`${SITE_URL}`} />
        <meta name="twitter:title" content="Alex Craig's Portfolio" />
        <meta name="twitter:description" content="Portfolio website of Alex Craig." />
        <meta name="twitter:image" content="/mstile-144x144.png" />
      </Head>

      <Section grow className={styles.about}>
        <Container className={styles.about__body}>
          <TitleShape icon={faTerminal}>Alex Craig</TitleShape>
          <small className={styles['about__sub-text']}>
            A front end developer living in a full stack world
          </small>

          <div className={styles.about__bio}>
            <p>
              I am a Toronto based full stack web developer currently working for{' '}
              <ExternalLink href="https://www.konrad.com/">Konrad Group</ExternalLink> as a
              permanent fixture on the{' '}
              <ExternalLink href="https://brainstation.io/">BrainStation</ExternalLink> technology
              team.
            </p>
            <p>
              I enjoy creating visual, interactive, and mixed media web based projects. A few of my
              hobbies include Magic The Gathering, competitive Smash Bros., as well as collecting
              old video games and&nbsp;vinyl.
            </p>
          </div>

          <TitleShape small level={2} icon={faUserFriends}>
            Socials
          </TitleShape>
          <small className={styles['about__sub-text']}>
            You can find me on any of these platforms
          </small>

          <ul className={styles['about__social-list']}>
            <DeepLink href="/projects" name="Projects" />
            <DeepLink href="/blog" name="Blog" />
            <SocialLink href="https://github.com/im-sticky" name="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/alex-craig-57427069/" name="LinkedIn" />
            <SocialLink href="https://twitter.com/im_sticky" name="Twitter" />
          </ul>

          <p className={styles['about__email']}>
            Want to get in touch with me directly? Feel free to email me at{' '}
            <ExternalLink href="mailto:acraig780@gmail.com">acraig780@gmail.com</ExternalLink>.
          </p>
        </Container>
      </Section>
    </>
  );
}

function SocialLink({href, name}) {
  return (
    <li className={styles['about__social-list-item']}>
      <ExternalLink href={href} noIcon>
        {name}
      </ExternalLink>
    </li>
  );
}

function DeepLink({href, name}) {
  return (
    <li className={styles['about__social-list-item']}>
      <InternalLink to={href}>{name}</InternalLink>
    </li>
  );
}
