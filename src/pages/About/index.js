import React from 'react';
import {Section} from 'components/Section';
import {Container} from 'components/Container';
import {Link} from 'components/Link';
import {ExternalLink} from 'components/ExternalLink';
import {TitleShape} from 'components/TitleShape';
import {faTerminal, faUserFriends} from '@fortawesome/free-solid-svg-icons';

import styles from './index.scss';

export const About = ({}) => {
  return <Section grow id='About' className='about'>
    <Container className='about__body'>
      <TitleShape icon={faTerminal} alt='terminal icon'>Alex Craig</TitleShape>
      <small className='about__sub-text'>A front end developer living in a full stack world</small>

      <div className='about__bio'>
        <p>
          I am a Toronto based full stack web developer currently working for <ExternalLink href='https://www.konrad.com/'>Konrad Group</ExternalLink> as a permanent fixture on the <ExternalLink href='https://brainstation.io/'>BrainStation</ExternalLink> technology team.
        </p>
        <p>
          I like making visual and interactive web based projects. Some of my hobbies include: Magic The Gathering, competitive Smash Bros., baking, and collecting various old games and&nbsp;vinyl.
        </p>
      </div>

      <TitleShape small level={2} icon={faUserFriends} alt='social icon'>Socials</TitleShape>
      <small className='about__sub-text'>You can find me on any of these platforms</small>

      <ul className='about__social-list'>
        <li className='about__social-list-item'>
          <Link to='/blog'>Blog</Link>
        </li>
        <SocialLink href='https://github.com/im-sticky' name='GitHub' />
        <SocialLink href='https://www.linkedin.com/in/alex-craig-57427069/' name='LinkedIn' />
        <SocialLink href='https://twitter.com/im_sticky' name='Twitter' />
        <SocialLink href='https://www.instagram.com/alex_is_sticky/' name='Instagram' />
      </ul>

      <p className='about__email'>Want to get in touch with me directly? Feel free to email me at <ExternalLink href='mailto:acraig780@gmail.com'>acraig780@gmail.com</ExternalLink>.</p>
    </Container>
  </Section>;
};


function SocialLink({href, name}) {
  return <li className='about__social-list-item'>
    <ExternalLink href={href} noIcon>{name}</ExternalLink>
  </li>;
}
