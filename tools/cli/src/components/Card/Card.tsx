import styles from './Card.module.scss';
import { CardProps } from './Card.types';

export function Card({ children }: CardProps) {
  return <div className={styles.card}>{children}</div>;
}
