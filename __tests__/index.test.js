/* eslint-disable no-underscore-dangle */
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getResult = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['file1.json', 'file2.json', 'stylish', 'stylish-result.txt'],
  ['file1.yaml', 'file2.yaml', 'stylish', 'stylish-result.txt'],
  ['file1.ini', 'file2.ini', 'stylish', 'stylish-result.txt'],
  ['file1.json', 'file2.json', 'plain', 'plain-result.txt'],
  ['file1.yaml', 'file2.yaml', 'plain', 'plain-result.txt'],
  ['file1.ini', 'file2.ini', 'plain', 'plain-result.txt'],
  ['file1.json', 'file2.json', 'json', 'json-result.json'],
  ['file1.yaml', 'file2.yaml', 'json', 'json-result.json'],
  ['file1.ini', 'file2.ini', 'json', 'json-result.json'],
])('gendiff(%s, %s) to %s', (fileBefore, fileAfter, format, expected) => {
  const result = genDiff(getFixturePath(fileBefore), getFixturePath(fileAfter), format);
  expect(result).toBe(getResult(expected));
});
