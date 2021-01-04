import ini from 'ini';
import _ from 'lodash';

const isNumber = (value) => {
  if (parseFloat(value)) {
    return true;
  }
  return false;
};

const formatValuesByType = (item) => {
  if (_.isObject(item)) {
    return _.mapValues(item, formatValuesByType);
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
