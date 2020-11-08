import jsonFormatter from './json.js';
import plainFormatter from './plain.js';
import stylishFormatter from './stylish.js';

const mapFormatToFormatter = {
  json: jsonFormatter,
  plain: plainFormatter,
  stylish: stylishFormatter,
};

const getFormatter = (formatterName) => mapFormatToFormatter[formatterName];

export default getFormatter;
