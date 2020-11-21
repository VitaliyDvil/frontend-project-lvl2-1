/* eslint-disable no-underscore-dangle */
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getResult = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const testingFilesFileFormats = ['json', 'yaml', 'ini'];

const outputFormatterTypes = ['stylish', 'plain', 'json'];

describe.each(testingFilesFileFormats)('gendiff with two %s files', (testingFileFormat) => {
  outputFormatterTypes.forEach((outputFormatterType) => {
    test(`gendiff(file1.${testingFileFormat}, file2.${testingFileFormat}) to ${outputFormatterType} output`, () => {
      const pathFileBefore = getFixturePath(`fileBefore.${testingFileFormat}`);
      const pathFileAfter = getFixturePath(`fileAfter.${testingFileFormat}`);
      const expectedResult = getResult(`${outputFormatterType}-result.txt`);

      const gendiffResult = genDiff(pathFileBefore, pathFileAfter, outputFormatterType);

      expect(gendiffResult).toBe(expectedResult);
    });
  });
});
