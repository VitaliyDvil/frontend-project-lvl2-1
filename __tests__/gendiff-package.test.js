import { test, expect } from '@jest/globals';
import getFixturePath from '../src/utils.js';
import genDiff from '../src/gendiff-package.js';

const result = '{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n}';

test('gendiff testing', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const filepath3 = getFixturePath('file3.yaml');
  const filepath4 = getFixturePath('file4.yaml');
  expect(genDiff(filepath1, filepath2)).toBe(result);
  expect(genDiff(filepath3, filepath4)).toBe(result);
});
