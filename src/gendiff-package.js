import path from 'path';
import lodash from 'lodash';
import { getFile, getProcessedJSONFile, getProcessedYAMLFile } from './parsers.js';

const { keys, has, union } = lodash;

const getUnionSortedKeys = (firstFile, secondFile) => {
  const allkeys = union(keys(firstFile), keys(secondFile));
  return allkeys.sort();
};

const genDiff = (firstFilePath, secondFilePath) => {
  const rawFirstFile = getFile(firstFilePath);
  const rawSecondFile = getFile(secondFilePath);

  const firstFile = (path.extname(firstFilePath) === '.json')
    ? getProcessedJSONFile(rawFirstFile)
    : getProcessedYAMLFile(rawFirstFile);

  const secondFile = (path.extname(secondFilePath) === '.json')
    ? getProcessedJSONFile(rawSecondFile)
    : getProcessedYAMLFile(rawSecondFile);

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
