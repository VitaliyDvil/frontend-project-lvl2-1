import jsonParser from './jsonParser.js';
import yamlParser from './yamlParser.js';
import iniParser from './iniParser.js';

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
