import jsonParser from './json-parser.js';
import yamlParser from './yaml-parser.js';
import iniParser from './ini-parser.js';

const mapFormatToParser = {
  json: jsonParser,
  yaml: yamlParser,
  ini: iniParser,
};

const getParser = (fileFormatName) => {
  if (mapFormatToParser[fileFormatName] === undefined) {
    throw new Error('Unsupported file format');
  }

  return mapFormatToParser[fileFormatName];
};

export default getParser;
