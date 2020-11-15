import getParsedJsonFile from './json-parser.js';
import getParsedYamlFile from './yaml-parser.js';
import getParsedIniFile from './ini-parser.js';

const mapFormatToParser = {
  json: getParsedJsonFile,
  yaml: getParsedYamlFile,
  ini: getParsedIniFile,
};

const getParser = (fileFormatName) => {
  if (mapFormatToParser[fileFormatName] === undefined) {
    throw new Error(`${fileFormatName} is unsupported file format`);
  }

  return mapFormatToParser[fileFormatName];
};

export default getParser;
