import React from 'react';
import {Section} from 'components/Section';
import {ExternalLink} from 'components/ExternalLink';

import styles from './index.scss';

export const Footer = ({}) => <Section id='Footer' className='footer'>
  <small>
    Hosted with <ExternalLink href='https://pages.github.com/'>GitHub Pages</ExternalLink> &copy;&nbsp;{new Date().getFullYear()}
  </small>
</Section>;