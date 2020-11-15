import jsonFormatter from './json.js';
import plainFormatter from './plain.js';
import stylishFormatter from './stylish.js';

const mapFormatToFormatter = {
  json: jsonFormatter,
  plain: plainFormatter,
  stylish: stylishFormatter,
};

const getFormatter = (formatterName) => {
  if (mapFormatToFormatter[formatterName] === undefined) {
    throw new Error('Unsupported output');
  }

  return mapFormatToFormatter[formatterName];
};

export default getFormatter;
