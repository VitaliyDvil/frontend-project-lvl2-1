import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getFile = (relativeFilePath) => {
  const filePath = path.resolve(process.cwd(), relativeFilePath);
  const file = fs.readFileSync(filePath, 'utf-8');
  return file;
};

const getProcessedJSONFile = (file) => JSON.parse(file);

const getProcessedYAMLFile = (file) => yaml.safeLoad(file);

const getProcessedINIFile = (file) => ini.parse(file);

const getParser = (filename) => {
  const fileExtName = path.extname(filename);
  if (fileExtName === '.json') {
    return getProcessedJSONFile;
  }
  if (fileExtName === '.yaml') {
    return getProcessedYAMLFile;
  }
  return getProcessedINIFile;
};

export {
  getFile,
  getParser,
};
