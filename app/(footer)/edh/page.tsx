import fs from 'fs';
import {join} from 'path';
import {Metadata} from 'next';
import {MDXRemote} from 'next-mdx-remote/rsc';
import {openGraphMeta} from '@helpers/openGraphMeta';
import {EdhCard} from '@models/edhCard';
import {Section} from '@components/Section';
import {Container} from '@components/Container';
import {TitleShape} from '@components/TitleShape';
import {VerticalHero} from '@components/VerticalHero';
import {faDragon} from '@fortawesome/free-solid-svg-icons';
import {CardZoom} from './cardZoom';
import styles from './index.module.scss';

export const metadata: Metadata = {
  title: 'Elder Dragon Highlander',
  description: 'The cards and stories that make up my lifelong EDH deck.',
  openGraph: openGraphMeta('/edh', '/edh/splash.jpg'),
};

export default function Edh() {
  const fullPath = join(process.cwd(), 'app/(footer)/edh/deck.mdx');
  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  const cards = getCards();

  return (
    <Section grow>
      <VerticalHero imageUrl="/edh/hero.jpg">
        <TitleShape icon={faDragon}>Elder Dragon Highlander</TitleShape>
        <p className={styles['title-description']}>
          The cards and stories that make up my lifelong EDH deck.
        </p>
      </VerticalHero>

      <Container>
        <MDXRemote source={fileContents} />

        {cards.map((card) => (
          <CardZoom key={card.name} card={card} />
        ))}
      </Container>
    </Section>
  );
}

function getCards(): EdhCard[] {
  return [
    new EdhCard({
      name: 'Tundra',
    }),
  ];
}
