import _ from 'lodash';

const getPathToProperty = (name, path) => {
  const currentPath = _.cloneDeep(path);
  currentPath.push(name);
  const pathToProperty = `'${currentPath.join('.')}'`;

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
  return value;
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

const genPlainFormattedDiff = (diffInfo) => {
  const iter = (tree, path = []) => {
    const valueProperties = tree.flatMap((key) => {
      const { type } = key;

      const getFormattedProperty = mapTypeToPropertyFormatter[type];

      if (type === 'unchanged') return getFormattedProperty();
      return getFormattedProperty(key, path, iter);
    });
    return valueProperties.join('\n');
  };
  return iter(diffInfo);
};

export default genPlainFormattedDiff;
