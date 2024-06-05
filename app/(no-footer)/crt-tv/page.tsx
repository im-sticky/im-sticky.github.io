import {Metadata} from 'next';
import {Section} from '@components/Section';
import {getAllCrtClips} from '@helpers/postUtils.mjs';
import {openGraphMeta} from '@helpers/openGraphMeta';
import {Crt} from './crt';
import styles from './index.module.scss';

export const metadata: Metadata = {
  title: 'CRT.tv',
  description: 'A CRT that displays game clips on different channels',
  openGraph: openGraphMeta('/crt-tv'),
};

export default function CrtTv() {
  const clips = getAllCrtClips();

  return (
    <Section grow className={styles.section}>
      <div className={styles.background}>
        <Crt clips={clips} />
      </div>
    </Section>
  );
}
