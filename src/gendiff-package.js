import { buildDiffInfo } from './utils.js';
import { getFile, getParser } from './parsers.js';

const genDiff = (firstFilePath, secondFilePath) => {
  const rawFirstFile = getFile(firstFilePath);
  const rawSecondFile = getFile(secondFilePath);

  const parser = getParser(firstFilePath);

  const firstFile = parser(rawFirstFile);
  const secondFile = parser(rawSecondFile);

  const diffInfo = buildDiffInfo(firstFile, secondFile);

  return diffInfo;
};

export default genDiff;
