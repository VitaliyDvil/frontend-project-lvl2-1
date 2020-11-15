import ini from 'ini';
import _ from 'lodash';

const isNumber = (value) => {
  if (parseInt(value, 10)) {
    return true;
  }
  return false;
};

const replaceStringsWithNumbers = (item) => {
  if (_.isObject(item)) {
    const keys = _.keys(item);
    return keys.reduce((acc, key) => {
      const newValue = replaceStringsWithNumbers(item[key]);
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
  return replaceStringsWithNumbers(parsedFile);
};

export default getParsedIniFile;
