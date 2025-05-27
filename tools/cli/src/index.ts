#!/usr/bin/env ts-node

import { Command } from 'commander';
import { generateComponent } from './commands/generateComponent';

const program = new Command();

program
  .name('bozz-cli')
  .description('CLI generativo per componenti e moduli front-end')
  .version('0.1.0');

program
  .command('generate')
  .argument('<type>', 'Tipo da generare (component)')
  .argument('<name>', 'Nome')
  .action(async (type, name) => {
    if (type === 'component') {
      await generateComponent(name);
    } else {
      console.error('Tipo non supportato');
    }
  });

program.parse();