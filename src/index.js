import buildDiffInfo from './diff-info.js';
import { readFile, getFileFormatName } from './utils.js';
import getParser from './parsers/parser-selector.js';
import getFormatter from './formatters/formatter-selector.js';

const genDiff = (beforeFilePath, afterFilePath, outputFormat) => {
  const beforeFileContent = readFile(beforeFilePath);
  const afterFileContent = readFile(afterFilePath);

  const beforFileFormatName = getFileFormatName(beforeFilePath);
  const afterFileFormatName = getFileFormatName(afterFilePath);

  const beforeFileParser = getParser(beforFileFormatName);
  const afterFileParser = getParser(afterFileFormatName);

  const parsedBeforeFile = beforeFileParser(beforeFileContent);
  const parsedAfterFile = afterFileParser(afterFileContent);

  const diffInfo = buildDiffInfo(parsedBeforeFile, parsedAfterFile);

  const formatter = getFormatter(outputFormat);

  return formatter(diffInfo);
};

export default genDiff;
