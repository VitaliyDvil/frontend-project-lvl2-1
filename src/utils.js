/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import path from 'path';

const getFile = (relativeFilePath) => {
  const filePath = path.resolve(process.cwd(), relativeFilePath);
  const file = fs.readFileSync(filePath, 'utf-8');
  return file;
};

export {
  getFile,
};
