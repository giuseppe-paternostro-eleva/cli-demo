import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export async function generateComponent(name: string) {
  const projectRoot = path.resolve(__dirname, '../../../../');
const componentDir = path.join(projectRoot, 'src/components', name);
  if (fs.existsSync(componentDir)) {
    console.log(chalk.red('⚠️ Componente già esistente.'));
    return;
  }

  fs.mkdirSync(componentDir, { recursive: true });

  // Component TSX
  const tsx = `import styles from './${name}.module.scss';
import { ${name}Props } from './${name}.types';

export function ${name}({ children }: ${name}Props) {
  return <div className={styles.${name.toLowerCase()}}>{children}</div>;
}
`;

  // Types
  const types = `import { ReactNode } from 'react';

export interface ${name}Props {
  children: ReactNode;
}
`;

  // SCSS
  const scss = `.${name.toLowerCase()} {
  @apply p-4 bg-gray-100 rounded;
}
`;

  fs.writeFileSync(path.join(componentDir, `${name}.tsx`), tsx);
  fs.writeFileSync(path.join(componentDir, `${name}.types.ts`), types);
  fs.writeFileSync(path.join(componentDir, `${name}.module.scss`), scss);

  console.log(chalk.green(`✅ Componente ${name} generato in src/components/${name}`));
}
