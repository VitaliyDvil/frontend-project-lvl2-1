#!/usr/bin/env node
import program from 'commander';
import { genDiff } from '../gendiff-package.js'; 

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action(genDiff)
  .option('-f, --format [type]', 'output format');

program.parse(program.args);
