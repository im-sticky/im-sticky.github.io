import {Metadata} from 'next';
import {Section} from '@components/Section';
import {Container} from '@components/Container';
import {InternalLink} from '@components/InternalLink';
import {ExternalLink} from '@components/ExternalLink';
import {TitleShape} from '@components/TitleShape';
import {faTerminal, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import styles from './about.module.scss';

export const metadata: Metadata = {
  title: 'About',
  description: 'Personal website of Alex Craig.',
};

export default function About() {
  return (
    <Section grow className={styles.about}>
      <Container className={styles.about__body}>
        <TitleShape icon={faTerminal}>Alex Craig</TitleShape>
        <small className={styles['about__sub-text']}>
          A front end developer living in a full stack world
        </small>

        <div className={styles.about__bio}>
          <p>
            I am a Toronto based full stack web developer currently working for{' '}
            <ExternalLink href="https://www.konrad.com/">Konrad Group</ExternalLink> as a permanent
            fixture on the <ExternalLink href="https://brainstation.io/">BrainStation</ExternalLink>{' '}
            technology team.
          </p>
          <p>
            I enjoy creating interactive mixed media projects and dabbling in game development. Some
            of my hobbies and interests include Magic The Gathering, speedrunning, competitive Smash
            Bros., and collecting video game paraphernalia.
          </p>
        </div>

        <TitleShape small level={2} icon={faUserFriends}>
          Work &amp; Socials
        </TitleShape>
        <small className={styles['about__sub-text']}>
          Find my work and musings here or on these platforms
        </small>

        <ul className={styles['about__social-list']}>
          <DeepLink href="/blog" name="Blog" />
          <DeepLink href="/projects" name="Projects &amp; Hobbies" />
          <SocialLink href="https://github.com/im-sticky" name="GitHub" />
          <SocialLink href="https://www.linkedin.com/in/alex-craig-57427069/" name="LinkedIn" />
        </ul>

        <p className={styles['about__email']}>
          Want to get in touch with me directly? Email me at{' '}
          <ExternalLink href="mailto:dev.alexcraig@gmail.com">dev.alexcraig@gmail.com</ExternalLink>
          .
        </p>
      </Container>
    </Section>
  );
}

interface LinkProps {
  href: string;
  name: string;
}

function SocialLink({href, name}: LinkProps) {
  return (
    <li className={styles['about__social-list-item']}>
      <ExternalLink href={href} noIcon>
        {name}
      </ExternalLink>
    </li>
  );
}

function DeepLink({href, name}: LinkProps) {
  return (
    <li className={styles['about__social-list-item']}>
      <InternalLink to={href}>{name}</InternalLink>
    </li>
  );
}
