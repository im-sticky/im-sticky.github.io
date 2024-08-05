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
  description: 'The cards that make up my lifelong EDH deck.',
  openGraph: openGraphMeta('/edh', '/edh/splash.jpg'),
};

export default function Edh() {
  const fullPath = join(process.cwd(), 'app/(footer)/edh/deck.mdx');
  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  const cards = getCards();
  const commander = new EdhCard({
    name: 'Sharuum the Hegemon',
  }).toJSON() as IEdhCard;

  return (
    <>
      <Section grow>
        <VerticalHero imageUrl="/edh/hero.jpg">
          <TitleShape icon={faDragon}>Elder Dragon Highlander</TitleShape>
          <p className={styles['title-description']}>
            The cards that make up my lifelong EDH deck.
          </p>
        </VerticalHero>
      </Section>

      <Section grow className={styles.container}>
        <Container className={styles.content}>
          <MDXRemote source={fileContents} />
        </Container>

        <Container large className={clsx('grid', 'grid--3', styles['span-grid'])}>
          <h2 className={clsx(styles.title, styles['span-grid'])}>The cards</h2>

          <CardZoom card={commander} className={styles['span-grid']} />

          {cards.map((card) => (
            <CardZoom key={card.imageName} card={card} />
          ))}
        </Container>
      </Section>
    </>
  );
}

function getCards(): IEdhCard[] {
  return [
    new EdhCard({
      name: 'Academy Ruins',
    }),
    new EdhCard({
      name: 'Altar of the Brood',
    }),
    new EdhCard({
      name: 'Ancient Den',
    }),
    new EdhCard({
      name: 'Ancient Tomb',
    }),
    new EdhCard({
      name: 'Armageddon',
    }),
    new EdhCard({
      name: 'Azorius Signet',
    }),
    new EdhCard({
      name: 'Bloodstained Mire',
    }),
    new EdhCard({
      name: 'Bottled Cloister',
    }),
    new EdhCard({
      name: 'Careful Consideration',
    }),
    new EdhCard({
      name: 'Celestial Colonnade',
    }),
    new EdhCard({
      name: 'Chromatic Lantern',
    }),
    new EdhCard({
      name: 'Cloud Key',
    }),
    new EdhCard({
      name: 'Coalition Relic',
    }),
    new EdhCard({
      name: 'Command Tower',
    }),
    new EdhCard({
      name: 'Creeping Tar Pit',
    }),
    new EdhCard({
      name: 'Damnation',
    }),
    new EdhCard({
      name: 'Darksteel Citadel',
    }),
    new EdhCard({
      name: 'Darksteel Ingot',
    }),
    new EdhCard({
      name: 'Darkwater Catacombs',
    }),
    new EdhCard({
      name: 'Defense Grid',
    }),
    new EdhCard({
      name: 'Demonic Tutor',
    }),
    new EdhCard({
      name: 'Diabolic Tutor',
    }),
    new EdhCard({
      name: 'Dimir Aqueduct',
    }),
    new EdhCard({
      name: 'Dimir Signet',
    }),
    new EdhCard({
      name: 'Disciple of the Vault',
    }),
    new EdhCard({
      name: 'Drowned Catacomb',
    }),
    new EdhCard({
      name: 'Enlightened Tutor',
    }),
    new EdhCard({
      name: 'Ensnaring Bridge',
    }),
    new EdhCard({
      name: 'Etherium Sculptor',
    }),
    new EdhCard({
      name: 'Ethersworn Canonist',
    }),
    new EdhCard({
      name: 'Fact or Fiction',
    }),
    new EdhCard({
      name: 'Flooded Strand',
    }),
    new EdhCard({
      name: 'Future Sight',
    }),
    new EdhCard({
      name: 'Gilded Lotus',
    }),
    new EdhCard({
      name: 'Glacial Fortress',
    }),
    new EdhCard({
      name: 'Glimmervoid',
    }),
    new EdhCard({
      name: 'Godless Shrine',
    }),
    new EdhCard({
      name: 'Grim Monolith',
    }),
    new EdhCard({
      name: 'Hallowed Fountain',
    }),
    new EdhCard({
      name: 'Intuition',
    }),
    new EdhCard({
      name: "Inventors' Fair",
    }),
    new EdhCard({
      name: 'Island',
      imageName: 'island-1.jpg',
    }),
    new EdhCard({
      name: 'Island',
      imageName: 'island-2.jpg',
    }),
    new EdhCard({
      name: 'Island',
      imageName: 'island-3.jpg',
    }),
    new EdhCard({
      name: 'Mana Confluence',
    }),
    new EdhCard({
      name: 'Mana Crypt',
    }),
    new EdhCard({
      name: 'Mana Vault',
    }),
    new EdhCard({
      name: 'Marsh Flats',
    }),
    new EdhCard({
      name: 'Memory Jar',
    }),
    new EdhCard({
      name: 'Mind Spring',
    }),
    new EdhCard({
      name: 'Mind Stone',
    }),
    new EdhCard({
      name: 'Mindslaver',
    }),
    new EdhCard({
      name: 'Misty Rainforest',
    }),
    new EdhCard({
      name: 'Mox Diamond',
    }),
    new EdhCard({
      name: 'Mox Opal',
    }),
    new EdhCard({
      name: 'Mystic Forge',
    }),
    new EdhCard({
      name: 'Necropotence',
    }),
    new EdhCard({
      name: 'Nihil Spellbomb',
    }),
    new EdhCard({
      name: 'Orzhov Signet',
    }),
    new EdhCard({
      name: 'Padeem, Consul of Innovation',
    }),
    new EdhCard({
      name: 'Paradoxical Outcome',
    }),
    new EdhCard({
      name: 'Phyrexian Arena',
    }),
    new EdhCard({
      name: 'Phyrexian Metamorph',
    }),
    new EdhCard({
      name: 'Plains',
    }),
    new EdhCard({
      name: 'Polluted Delta',
    }),
    new EdhCard({
      name: 'Prismatic Lens',
    }),
    new EdhCard({
      name: 'Reshape',
    }),
    new EdhCard({
      name: 'Riddlesmith',
    }),
    new EdhCard({
      name: 'Scalding Tarn',
    }),
    new EdhCard({
      name: 'Scrubland',
    }),
    new EdhCard({
      name: 'Sculpting Steel',
    }),
    new EdhCard({
      name: 'Seat of the Synod',
    }),
    new EdhCard({
      name: 'Semblance Anvil',
    }),
    new EdhCard({
      name: "Sensei's Divining Top",
    }),
    new EdhCard({
      name: 'Skycloud Expanse',
    }),
    new EdhCard({
      name: 'Sol Ring',
    }),
    new EdhCard({
      name: 'Solemn Simulacrum',
    }),
    new EdhCard({
      name: 'Supreme Verdict',
    }),
    new EdhCard({
      name: 'Swamp',
    }),
    new EdhCard({
      name: 'Sword of the Meek',
    }),
    new EdhCard({
      name: 'Talisman of Dominance',
    }),
    new EdhCard({
      name: 'Talisman of Progress',
    }),
    new EdhCard({
      name: 'Tezzeret, Agent of Bolas',
    }),
    new EdhCard({
      name: 'Tezzeret the Seeker',
    }),
    new EdhCard({
      name: 'Thirst for Knowledge',
    }),
    new EdhCard({
      name: 'Thopter Foundry',
    }),
    new EdhCard({
      name: 'Thoughtcast',
    }),
    new EdhCard({
      name: 'Time Sieve',
    }),
    new EdhCard({
      name: 'Transmute Artifact',
    }),
    new EdhCard({
      name: 'Trinket Mage',
    }),
    new EdhCard({
      name: 'Tundra',
    }),
    new EdhCard({
      name: 'Underground Sea',
    }),
    new EdhCard({
      name: 'Vampiric Tutor',
    }),
    new EdhCard({
      name: 'Vault of Whispers',
    }),
    new EdhCard({
      name: 'Vedalken Archmage',
    }),
    new EdhCard({
      name: 'Verdant Catacombs',
    }),
    new EdhCard({
      name: 'Watery Grave',
    }),
    new EdhCard({
      name: 'Winter Orb',
    }),
    new EdhCard({
      name: 'Wrath of God',
    }),
  ].map((x) => x.toJSON() as IEdhCard);
}
