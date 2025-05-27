import styles from './Test.module.scss';
import { TestProps } from './Test.types';

export function Test({ children }: TestProps) {
  return <div className={styles.test}>{children}</div>;
}
