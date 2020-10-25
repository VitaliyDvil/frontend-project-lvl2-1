#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/gendiff-package.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const diffInfo = genDiff(filepath1, filepath2);
    let formatter;
    if (program.format === 'stylish') formatter = stylish;
    if (program.format === 'plain') formatter = plain;
    const result = formatter(diffInfo);
    console.log(result);
  });

program.parse(program.args);
