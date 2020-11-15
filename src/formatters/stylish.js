import _ from 'lodash';

const INDENT = '    ';

const makeIndent = (deep) => INDENT.repeat(deep);

const makeObjAsString = (obj, deep) => {
  const keys = Object.keys(obj);
  const rows = keys.map((key) => {
    const indent = makeIndent(deep);
    const row = ((_.isObject(obj[key])))
      ? `${key}: ${makeObjAsString(obj[key], deep + 1)}`
      : `${key}: ${obj[key]}`;
    return `${indent}${row}`;
  });

  const braceIndent = makeIndent(deep - 1);
  return `{\n${rows.join('\n')}\n${braceIndent}}`;
};

const checkValueType = (val, deep) => {
  const result = (_.isObject(val))
    ? makeObjAsString(val, deep + 1)
    : val;
  return result;
};

const nestedPropertyFormatter = (key, indent, deep, func) => {
  const {
    name,
    children,
  } = key;

  const nested = func(children, deep + 1);
  const row = `${name}: ${nested}`;
  return `${indent}${row}`;
};

const unchangedPropertyFormatter = (key, indent, deep) => {
  const {
    name,
    value,
  } = key;

  const printerValue = checkValueType(value, deep);
  const row = `${name}: ${printerValue}`;
  return `${indent}${row}`;
};

const addedPropertyFormatter = (key, indent, deep) => {
  const {
    name,
    value,
  } = key;

  const printerValue = checkValueType(value, deep);
  const row = `+ ${name}: ${printerValue}`;
  return `${indent.slice(2)}${row}`;
};

const removedPropertyFormatter = (key, indent, deep) => {
  const {
    name,
    value,
  } = key;

  const printerValue = checkValueType(value, deep);
  const row = `- ${name}: ${printerValue}`;
  return `${indent.slice(2)}${row}`;
};

const updatedPropertyFormatter = (key, indent, deep) => {
  const {
    name,
    valueBefore,
    valueAfter,
  } = key;

  const printerValueBefore = checkValueType(valueBefore, deep);
  const printerValueAfter = checkValueType(valueAfter, deep);

  const result = [];

  const firstRow = `- ${name}: ${printerValueBefore}`;
  const secondRow = `+ ${name}: ${printerValueAfter}`;

  result.push(`${indent.slice(2)}${firstRow}`);
  result.push(`${indent.slice(2)}${secondRow}`);
  return result;
};

const mapTypeToPropertyFormatter = {
  nested: nestedPropertyFormatter,
  unchanged: unchangedPropertyFormatter,
  added: addedPropertyFormatter,
  removed: removedPropertyFormatter,
  updated: updatedPropertyFormatter,
};

const stylishFormatter = (diffInfo) => {
  const iter = (tree, deep) => {
    const parts = tree.flatMap((key) => {
      const { type } = key;
      const indent = makeIndent(deep);

      const getFormattedProperty = mapTypeToPropertyFormatter[type];
      const result = (type === 'nested')
        ? getFormattedProperty(key, indent, deep, iter)
        : getFormattedProperty(key, indent, deep);
      return result;
    });
    const braceIndent = makeIndent(deep - 1);
    return `{\n${parts.join('\n')}\n${braceIndent}}`;
  };

  return iter(diffInfo, 1);
};

export default stylishFormatter;
