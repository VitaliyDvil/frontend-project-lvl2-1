import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
const { has, union } = lodash;

const getProcessedFile = (relativeFilePath) => {
  const filePath = path.resolve(process.cwd(), relativeFilePath);
  const file = fs.readFileSync(filePath);
  return JSON.parse(file);
};

const genDiff = (firstFilePath, secondFilePath) => {
  const firstFile = getProcessedFile(firstFilePath);
  const secondFile = getProcessedFile(secondFilePath);
  
  const firstFileKeys = Object.keys(firstFile);
  const secondFileKeys = Object.keys(secondFile);
  
  const allkeys = union(firstFileKeys, secondFileKeys);
  const sortedKeys = allkeys.sort();

  const result = sortedKeys.reduce((acc, key) => {
    if (has(firstFile, key) && !has(secondFile, key)) {
      acc.push(` - ${key}: ${firstFile[key]}`);
      return acc;
    }
    if (!has(firstFile, key) && has(secondFile, key)) {
      acc.push(` + ${key}: ${secondFile[key]}`)
      return acc;
    }
    if (firstFile[key] !== secondFile[key]) {
      acc.push(` - ${key}: ${firstFile[key]}`);
      acc.push(` + ${key}: ${secondFile[key]}`);
      return acc;
    }
    if (firstFile[key] === secondFile[key]) {
      acc.push(`   ${key}: ${firstFile[key]}`);
      return acc;
    }
  }, []);
  console.log(`{\n${result.join('\n')}\n}`);
};

export {
  genDiff,
}
