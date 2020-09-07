import { test, expect } from '@jest/globals';
import getFixturePath from '../src/utils.js';
import genDiff from '../src/gendiff-package.js';

const result = '{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n}';

test('gendiff with json files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(genDiff(filepath1, filepath2)).toBe(result);
});

test('gendiff with yaml files', () => {
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yaml');
  expect(genDiff(filepath1, filepath2)).toBe(result);
});
