import _ from 'lodash';
import getJsonOutput from './json.js';
import getPlainOutput from './plain.js';
import getStylishOutput from './stylish.js';

const mapFormatToFormatter = {
  json: getJsonOutput,
  plain: getPlainOutput,
  stylish: getStylishOutput,
};

const getFormatter = (diffInfo, outputFormat) => {
  // if (!_.has(mapFormatToFormatter, outputFormat)) {
  //   throw new Error(`${outputFormat} is unsupported`);
  // }

  const diffFormat = mapFormatToFormatter[outputFormat];
  return diffFormat(diffInfo);
};

export default getFormatter;
