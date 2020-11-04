/* eslint-disable no-restricted-globals */
import ini from 'ini';
import _ from 'lodash';

const iter = (item) => {
  if (_.isObject(item)) {
    const keys = _.keys(item);
    return keys.reduce((acc, key) => {
      const newValue = iter(item[key]);
      acc[key] = newValue;
      return acc;
    }, {});
  }
  if (!isNaN(item) && !_.isBoolean(item)) {
    const newValue = Number(item);
    return newValue;
  }
  return item;
};

const iniParser = (file) => {
  const parsedFile = ini.parse(file);
  return iter(parsedFile);
};

export default iniParser;
