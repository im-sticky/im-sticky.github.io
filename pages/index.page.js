import {Section} from 'components/Section';
import {Container} from 'components/Container';
import {InternalLink} from 'components/Link';
import {ExternalLink} from 'components/Link';
import {TitleShape} from 'components/TitleShape';
import {faTerminal, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {PageHead} from 'components/PageHead';
import styles from 'styles/Home.module.scss';

export default function Home() {
  return (
    <>
      <PageHead url="" title="Home" description="Portfolio website of Alex Craig." />

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
              I enjoy creating interactive mixed media projects and dabbling in game development.
              Some of my hobbies and interests include Magic The Gathering, speedrunning,
              competitive Smash Bros., and collecting video game paraphernalia.
            </p>
          </div>

          <TitleShape small level={2} icon={faUserFriends}>
            Work &amp; Socials
          </TitleShape>
          <small className={styles['about__sub-text']}>
            Find my work and musings here or on these platforms
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
            <ExternalLink href="mailto:dev.alexcraig@gmail.com">
              dev.alexcraig@gmail.com
            </ExternalLink>
            .
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
