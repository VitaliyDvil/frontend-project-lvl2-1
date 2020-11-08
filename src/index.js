import path from 'path';
import buildDiffInfo from './diff-info.js';
import { getFile } from './utils.js';
import getParser from './parsers/parser-selector.js';
import getFormatter from './formatters/formatter-selector.js';

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
