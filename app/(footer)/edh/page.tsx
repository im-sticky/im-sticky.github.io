import fs from 'fs';
import {join} from 'path';
import clsx from 'clsx';
import {Metadata} from 'next';
import {MDXRemote} from 'next-mdx-remote/rsc';
import {openGraphMeta} from '@helpers/openGraphMeta';
import {EdhCard, IEdhCard} from '@models/edhCard';
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
      </Container>

      <Container large className={clsx('grid', 'grid--3')}>
        {cards.map((card) => (
          <CardZoom key={card.name} card={card} />
        ))}
      </Container>
    </Section>
  );
}

function getCards(): IEdhCard[] {
  return [
    new EdhCard({
      name: 'Tundra',
      year: 2015,
      yearUnknown: true,
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, consequuntur! Sed consequatur iure explicabo harum in ad corporis fuga reiciendis nemo. Voluptatem enim incidunt qui, cumque rem inventore quod pariatur!',
    }),
  ].map((x) => x.toJSON() as IEdhCard);
}
