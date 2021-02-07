import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getResult = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fileFormats = ['json', 'yml', 'ini'];

const outputFormatterTypes = ['stylish', 'plain', 'json'];

describe.each(fileFormats)('gendiff call given two files %s format', (testingFileFormat) => {
  outputFormatterTypes.forEach((outputFormatterType) => {
    const pathFileBefore = getFixturePath(`fileBefore.${testingFileFormat}`);
    const pathFileAfter = getFixturePath(`fileAfter.${testingFileFormat}`);

    const expectedResult = getResult(`${outputFormatterType}Result.txt`);

    test(`output ${outputFormatterType} formatter should return expected result`, () => {
      const gendiffResult = genDiff(pathFileBefore, pathFileAfter, outputFormatterType);
      expect(gendiffResult).toBe(expectedResult);
    });
  });
});
