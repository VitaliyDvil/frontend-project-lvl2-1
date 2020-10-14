/* eslint-disable no-underscore-dangle */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import lodash from 'lodash';

const {
  union,
  keys,
  has,
  isObject,
} = lodash;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getUnionSortedKeys = (firstFile, secondFile) => {
  const allkeys = union(keys(firstFile), keys(secondFile));
  return allkeys.sort();
};

const getDiffInfo = (name, value, type) => {
  const diffInfo = {
    name,
    value,
    type,
  };
  return diffInfo;
};

const buildDiffInfo = (first, second) => {
  const unionKeys = getUnionSortedKeys(first, second);
  return unionKeys.map((key) => {
    if (isObject(first[key]) && isObject(second[key])) {
      const children = buildDiffInfo(first[key], second[key]);
      return {
        name: key,
        children,
        type: 'nested',
      };
    }

    if (has(first, key) && !has(second, key)) {
      return getDiffInfo(key, first[key], 'deleted');
    }
    if (!has(first, key) && has(second, key)) {
      return getDiffInfo(key, second[key], 'added');
    }
    if (first[key] === second[key]) {
      return getDiffInfo(key, first[key], 'unchanged');
    }
    return {
      name: key,
      firstValue: first[key],
      secondValue: second[key],
      type: 'changed',
    };
  });
};

export {
  getFixturePath,
  buildDiffInfo,
};
