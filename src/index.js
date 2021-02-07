import buildDiffInfo from './diffInfo.js';
import { readFile, getFileFormatName } from './utils.js';
import getParsedFile from './parsers/index.js';
import getFormatterOutput from './formatters/index.js';

const genDiff = (beforeFilePath, afterFilePath, outputFormat = 'stylish') => {
  const beforeFileContent = readFile(beforeFilePath);
  const afterFileContent = readFile(afterFilePath);

  const beforFileFormatName = getFileFormatName(beforeFilePath);
  const afterFileFormatName = getFileFormatName(afterFilePath);

  const parsedBeforeFile = getParsedFile(beforeFileContent, beforFileFormatName);
  const parsedAfterFile = getParsedFile(afterFileContent, afterFileFormatName);

  const diffInfo = buildDiffInfo(parsedBeforeFile, parsedAfterFile);

  return getFormatterOutput(diffInfo, outputFormat);
};

export default genDiff;
