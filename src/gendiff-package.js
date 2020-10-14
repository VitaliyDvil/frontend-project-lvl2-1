import { buildDiffInfo } from './utils.js';
import { getFile, getParser } from './parsers.js';
import formatter from './formatters/stylish.js';

const genDiff = (firstFilePath, secondFilePath) => {
  const rawFirstFile = getFile(firstFilePath);
  const rawSecondFile = getFile(secondFilePath);

  const parser = getParser(firstFilePath);

  const firstFile = parser(rawFirstFile);
  const secondFile = parser(rawSecondFile);

  const diffInfo = buildDiffInfo(firstFile, secondFile);

  return formatter(diffInfo);
};

export default genDiff;
