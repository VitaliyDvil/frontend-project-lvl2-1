import jsonParser from './json-parser.js';
import yamlParser from './yaml-parser.js';
import iniParser from './ini-parser.js';

const mapFormatToParser = {
  json: jsonParser,
  yaml: yamlParser,
  ini: iniParser,
};

const getParser = (fileExtName) => {
  if (fileExtName === '.json') {
    return mapFormatToParser.json;
  }
  if (fileExtName === '.yaml') {
    return mapFormatToParser.yaml;
  }
  return mapFormatToParser.ini;
};

export default getParser;
