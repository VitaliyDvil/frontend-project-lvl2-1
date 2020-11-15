import _ from 'lodash';

const getPathToProperty = (name, path) => {
  path.push(name);
  const pathToProperty = `'${path.join('.')}'`;
  path.pop();
  return pathToProperty;
};

const getStartOfSentence = (name, path, type) => {
  const pathProperty = getPathToProperty(name, path);
  return `property ${pathProperty} was ${type}`;
};

const getPrintedValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const getFormattedUnchangedProperty = () => [];

const getFormattedAddedProperty = (key, path) => {
  const { name, value, type } = key;

  const startOfSentence = getStartOfSentence(name, path, type);

  const printedValue = getPrintedValue(value);
  return `${startOfSentence} with value: ${printedValue}`;
};

const getFormattedRemovedPRoperty = (key, path) => {
  const { name, type } = key;

  const startOfSentence = getStartOfSentence(name, path, type);
  return startOfSentence;
};

const getFormattedUpdatedProperty = (key, path) => {
  const {
    name,
    valueBefore,
    valueAfter,
    type,
  } = key;

  const startOfSentence = getStartOfSentence(name, path, type);

  const printedValueBefore = getPrintedValue(valueBefore);
  const printedValueAfter = getPrintedValue(valueAfter);

  return `${startOfSentence}. From ${printedValueBefore} to ${printedValueAfter}`;
};

const getFormattedNestedProperty = (key, path, iter) => {
  const { name, children } = key;

  path.push(name);
  const nested = iter(children, path);
  path.pop();

  return nested;
};

const mapTypeToPropertyFormatter = {
  unchanged: getFormattedUnchangedProperty,
  added: getFormattedAddedProperty,
  removed: getFormattedRemovedPRoperty,
  updated: getFormattedUpdatedProperty,
  nested: getFormattedNestedProperty,
};

const plainFormatter = (diffInfo) => {
  const iter = (tree, path = []) => {
    const valueProperties = tree.flatMap((key) => {
      const { type } = key;

      const getFormattedProperty = mapTypeToPropertyFormatter[type];

      if (type === 'unchanged') return getFormattedProperty();
      if (type === 'nested') return getFormattedProperty(key, path, iter);
      return getFormattedProperty(key, path);
    });
    return valueProperties.join('\n');
  };
  return iter(diffInfo);
};

export default plainFormatter;
