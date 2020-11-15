import buildDiffInfo from './diff-info.js';
import { readFile, getFileFormatName } from './utils.js';
import getParser from './parsers/parser-selector.js';
import getFormatter from './formatters/formatter-selector.js';

const genDiff = (beforeFilePath, afterFilePath, outputFormat) => {
  const beforeFileContent = readFile(beforeFilePath);
  const afterFileContent = readFile(afterFilePath);

  const beforFileFormatName = getFileFormatName(beforeFilePath);
  const afterFileFormatName = getFileFormatName(afterFilePath);

  const getParsedBeforeFile = getParser(beforFileFormatName);
  const getParsedAfterFile = getParser(afterFileFormatName);

  const parsedBeforeFile = getParsedBeforeFile(beforeFileContent);
  const parsedAfterFile = getParsedAfterFile(afterFileContent);

  const diffInfo = buildDiffInfo(parsedBeforeFile, parsedAfterFile);

  const getFormatterOutput = getFormatter(outputFormat);

  return getFormatterOutput(diffInfo);
};

export default genDiff;
