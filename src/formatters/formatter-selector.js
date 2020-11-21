import genJsonFormattedDiff from './json.js';
import genPlainFormattedDiff from './plain.js';
import genStylishFormattedDiff from './stylish.js';

const mapFormatToFormatter = {
  json: genJsonFormattedDiff,
  plain: genPlainFormattedDiff,
  stylish: genStylishFormattedDiff,
};

const getFormatter = (formatterName) => mapFormatToFormatter[formatterName];

export default getFormatter;
