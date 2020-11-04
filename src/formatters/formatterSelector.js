import jsonFormatter from './json.js';
import plainFormatter from './plain.js';
import stylishFormatter from './stylish.js';

const mapFormatToFormatter = {
  json: jsonFormatter,
  plain: plainFormatter,
  stylish: stylishFormatter,
};

const getFormatter = (formatterName) => {
  if (formatterName === 'json') {
    return mapFormatToFormatter.json;
  }
  if (formatterName === 'plain') {
    return mapFormatToFormatter.plain;
  }
  return mapFormatToFormatter.stylish;
};

export default getFormatter;
