#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/gendiff-package.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/jsonFormatter.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const diffInfo = genDiff(filepath1, filepath2);
    if (program.format === 'json') {
      return json(diffInfo);
    }
    const result = (program.format === 'stylish')
      ? stylish(diffInfo)
      : plain(diffInfo);

    console.log(result);
    return result;
  });

program.parse(program.args);
