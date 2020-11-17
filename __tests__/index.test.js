/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getResult = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const givenTwoFilesFileFormatAndOutputFormatterTypeAsParamsWhenGendiffIsCalledThenItShouldReturnExpectedResult = (testingFileFormat, outputFormatterType) => {
  const pathFileBefore = getFixturePath(`file1.${testingFileFormat}`);
  const pathFileAfter = getFixturePath(`file2.${testingFileFormat}`);
  const expectedResult = getResult(`${outputFormatterType}-result.txt`);

  const gendiffResult = genDiff(pathFileBefore, pathFileAfter, outputFormatterType);

  expect(gendiffResult).toBe(expectedResult);
};

const twoTestingFilesFileFormats = ['json', 'yaml', 'ini'];

const outputFormatterTypes = ['stylish', 'plain', 'json'];

test.each(twoTestingFilesFileFormats)('gendiff with  two *.%s files', (testingFileFormat) => {
  outputFormatterTypes.forEach((outputFormatterType) => {
    givenTwoFilesFileFormatAndOutputFormatterTypeAsParamsWhenGendiffIsCalledThenItShouldReturnExpectedResult(testingFileFormat, outputFormatterType);
  });
});
