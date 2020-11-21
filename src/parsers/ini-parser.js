import ini from 'ini';
import _ from 'lodash';

const NUMBER_SYSTEM = 10;

const isNumber = (value) => {
  if (parseInt(value, NUMBER_SYSTEM)) {
    return true;
  }
  return false;
};

const formatValuesByType = (item) => {
  if (_.isObject(item)) {
    const keys = _.keys(item);
    return keys.reduce((acc, key) => {
      const newValue = formatValuesByType(item[key]);
      acc[key] = newValue;
      return acc;
    }, {});
  }
  if (isNumber(item)) {
    const newValue = Number(item);
    return newValue;
  }
  return item;
};

const getParsedIniFile = (file) => {
  const parsedFile = ini.parse(file);
  return formatValuesByType(parsedFile);
};

export default getParsedIniFile;
