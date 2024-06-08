import {EdhCard} from '@models/edhCard';
import styles from './cardZoom.module.scss';

interface CardZoomProps {
  card: EdhCard;
}

export function CardZoom({card}: CardZoomProps) {
  return <div>{card.name}</div>;
}
