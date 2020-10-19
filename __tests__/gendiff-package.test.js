import { test, expect, beforeEach } from '@jest/globals';
import { getFixturePath } from '../src/utils.js';
import genDiff from '../src/gendiff-package.js';
import stylish from '../src/formatters/stylish.js';

let result;
beforeEach(() => {
  result = '{\n    common: {\n      + follow: false\n        setting1: Value 1\n      - setting2: 200\n      - setting3: true\n      + setting3: {\n            key: value\n        }\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n        setting6: {\n            doge: {\n              - wow: too much\n              + wow: so much\n            }\n            key: value\n          + ops: vops\n        }\n    }\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }\n  - group2: {\n        abc: 12345\n        deep: {\n            id: 45\n        }\n    }\n  + group3: {\n        fee: 100500\n        deep: {\n            id: {\n                number: 45\n            }\n        }\n    }\n}';
});

test('gendiff testing with json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const diffInfo = genDiff(filepath1, filepath2);
  expect(stylish(diffInfo)).toBe(result);
});

test('gendiff testing with yaml', () => {
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yaml');

  const diffInfo = genDiff(filepath1, filepath2);
  expect(stylish(diffInfo)).toBe(result);
});

test('gendiff testing with ini', () => {
  const filepath1 = getFixturePath('file1.ini');
  const filepath2 = getFixturePath('file2.ini');

  const diffInfo = genDiff(filepath1, filepath2);
  expect(stylish(diffInfo)).toBe(result);
});
