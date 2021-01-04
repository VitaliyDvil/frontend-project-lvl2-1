// import _ from 'lodash';
import getParsedJsonFile from './jsonParser.js';
import getParsedYamlFile from './yamlParser.js';
import getParsedIniFile from './iniParser.js';

const mapFormatToParser = {
  json: getParsedJsonFile,
  yaml: getParsedYamlFile,
  ini: getParsedIniFile,
};

const getParsedFile = (fileContent, fileFormatName) => {
  // if (!_.has(mapFormatToParser, fileFormatName)) {
  //   throw new Error(`${fileFormatName} is unsupported file format`);
  // }

  const parseFile = mapFormatToParser[fileFormatName];
  return parseFile(fileContent);
};

export default getParsedFile;
