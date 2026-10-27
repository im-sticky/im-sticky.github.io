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
          <p>I am a Toronto based software architect currently looking for work.</p>
          <p>
            Hello, I'm Alex. A full stack web developer that enjoys the nuance and design of the
            front end. I also enjoy creating mixed media projects as well as game design and
            development. Some of my hobbies and interests include collecting and competing in
            trading card games, speedrunning, and collecting video game paraphernalia.
          </p>
        </div>

        <TitleShape small level={2} icon={faUserFriends}>
          Work &amp; Socials
        </TitleShape>
        <small className={styles['about__sub-text']}>
          Find my work and musings here or on these platforms
        </small>

        <ul className={styles['about__social-list']}>
          <DeepLink href="/projects" name="Projects &amp; Hobbies" />
          <DeepLink href="/blog" name="Blog" />
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
