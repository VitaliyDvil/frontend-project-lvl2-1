import path from 'path';
import buildDiffInfo from './diffInfo.js';
import { getFile } from './utils.js';
import getParser from './parsers/parserSelector.js';
import getFormatter from './formatters/formatterSelector.js';

const genDiff = (beforeFilePath, afterFilePath, outputFormat) => {
  const rawFirstFile = getFile(beforeFilePath);
  const rawSecondFile = getFile(afterFilePath);

  const fileExtName = path.extname(beforeFilePath);
  const parser = getParser(fileExtName);

  const parsedBeforeFile = parser(rawFirstFile);
  const parsedAfterFile = parser(rawSecondFile);

  const diffInfo = buildDiffInfo(parsedBeforeFile, parsedAfterFile);

  const formatter = getFormatter(outputFormat);

  return formatter(diffInfo);
};

export default genDiff;
