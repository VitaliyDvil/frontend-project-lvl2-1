import fs from 'fs';
import path from 'path';

const KeyType = {
  NESTED: 'nested',
  REMOVED: 'removed',
  ADDED: 'added',
  UNCHANGED: 'unchanged',
  UPDATED: 'updated',
};

const readFile = (relativeFilePath) => {
  const filePath = path.resolve(process.cwd(), relativeFilePath);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return fileContent;
};

const getFileFormatName = (filePath) => {
  const fileExtName = path.extname(filePath);
  const fileFormatName = fileExtName.slice(1);
  return fileFormatName;
};

export {
  KeyType,
  readFile,
  getFileFormatName,
};
