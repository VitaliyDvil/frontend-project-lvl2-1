import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
const { has, union } = lodash;

const getProcessedFile = (relativeFilePath) => {
  const filePath = path.resolve(process.cwd(), relativeFilePath);
  const file = fs.readFileSync(filePath);
  return JSON.parse(file);
};

const getUnionSortedKeys = (firstFile, secondFile) => {
  const firstFileKeys = Object.keys(firstFile);
  const secondFileKeys = Object.keys(secondFile);
  
  const allkeys = union(firstFileKeys, secondFileKeys);
  return allkeys.sort();
};

const genDiff = (firstFilePath, secondFilePath) => {
  const firstFile = getProcessedFile(firstFilePath);
  const secondFile = getProcessedFile(secondFilePath);

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
  console.log(`{\n${result.join('\n')}\n}`);
};

export {
  genDiff,
}
