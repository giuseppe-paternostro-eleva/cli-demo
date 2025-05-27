import styles from './Prova.module.scss';
import { ProvaProps } from './Prova.types';

export function Prova({ children }: ProvaProps) {
  return <div className={styles.prova}>{children}</div>;
}
