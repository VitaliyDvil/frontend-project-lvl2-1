import getJsonOutput from './json.js';
import getPlainOutput from './plain.js';
import getStylishOutput from './stylish.js';

const mapFormatToFormatter = {
  json: getJsonOutput,
  plain: getPlainOutput,
  stylish: getStylishOutput,
};

const getFormatter = (formatterName) => mapFormatToFormatter[formatterName];

export default getFormatter;
