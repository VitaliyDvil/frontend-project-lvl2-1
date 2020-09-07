import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getFile = (relativeFilePath) => {
  const filePath = path.resolve(process.cwd(), relativeFilePath);
  const file = fs.readFileSync(filePath);
  return file;
};

const getProcessedJSONFile = (file) => JSON.parse(file);

const getProcessedYAMLFile = (file) => yaml.safeLoad(file);

export {
  getFile,
  getProcessedJSONFile,
  getProcessedYAMLFile,
};
