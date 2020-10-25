import { test, expect, beforeEach } from '@jest/globals';
import { getFixturePath } from '../src/utils.js';
import genDiff from '../src/gendiff-package.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';

let stylishResult;
let plainResult;
beforeEach(() => {
  stylishResult = '{\n    common: {\n      + follow: false\n        setting1: Value 1\n      - setting2: 200\n      - setting3: true\n      + setting3: {\n            key: value\n        }\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n        setting6: {\n            doge: {\n              - wow: too much\n              + wow: so much\n            }\n            key: value\n          + ops: vops\n        }\n    }\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }\n  - group2: {\n        abc: 12345\n        deep: {\n            id: 45\n        }\n    }\n  + group3: {\n        fee: 100500\n        deep: {\n            id: {\n                number: 45\n            }\n        }\n    }\n}';
  plainResult = 'property \'common.follow\' was added with value: \'false\'\nproperty \'common.setting2\' was removed\nproperty \'common.setting3\' was updated. From \'true\' to [complex value]\nproperty \'common.setting4\' was added with value: \'blah blah\'\nproperty \'common.setting5\' was added with value: [complex value]\nproperty \'common.setting6.doge.wow\' was updated. From \'too much\' to \'so much\'\nproperty \'common.setting6.ops\' was added with value: \'vops\'\nproperty \'group1.baz\' was updated. From \'bas\' to \'bars\'\nproperty \'group1.nest\' was updated. From [complex value] to \'str\'\nproperty \'group2\' was removed\nproperty \'group3\' was added with value: [complex value]';
});

test('gendiff testing with json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const diffInfo = genDiff(filepath1, filepath2);
  expect(stylish(diffInfo)).toBe(stylishResult);
});

test('gendiff testing with yaml', () => {
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yaml');

  const diffInfo = genDiff(filepath1, filepath2);
  expect(stylish(diffInfo)).toBe(stylishResult);
  expect(plain(diffInfo)).toBe(plainResult);
});

test('gendiff testing with ini', () => {
  const filepath1 = getFixturePath('file1.ini');
  const filepath2 = getFixturePath('file2.ini');

  const diffInfo = genDiff(filepath1, filepath2);
  expect(stylish(diffInfo)).toBe(stylishResult);
  expect(plain(diffInfo)).toBe(plainResult);
});
