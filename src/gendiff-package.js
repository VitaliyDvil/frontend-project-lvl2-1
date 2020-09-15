import lodash from 'lodash';
import { getUnionSortedKeys } from './utils.js';
import { getFile, getParser } from './parsers.js';

const { has } = lodash;

const genDiff = (firstFilePath, secondFilePath) => {
  const rawFirstFile = getFile(firstFilePath);
  const rawSecondFile = getFile(secondFilePath);

  const parser = getParser(firstFilePath);

  const firstFile = parser(rawFirstFile);
  const secondFile = parser(rawSecondFile);

  const unionSortedKeys = getUnionSortedKeys(firstFile, secondFile);
  const result = unionSortedKeys.reduce((acc, key) => {
    if (has(firstFile, key) && !has(secondFile, key)) {
      acc.push(` - ${key}: ${firstFile[key]}`);
    } else if (!has(firstFile, key) && has(secondFile, key)) {
      acc.push(` + ${key}: ${secondFile[key]}`);
    } else if (firstFile[key] !== secondFile[key]) {
      acc.push(` - ${key}: ${firstFile[key]}`);
      acc.push(` + ${key}: ${secondFile[key]}`);
    } else if (firstFile[key] === secondFile[key]) {
      acc.push(`   ${key}: ${firstFile[key]}`);
    }
    return acc;
  }, []);
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
