import _ from 'lodash';

const INDENT = '    ';

const indentForProperty = {
  unchanged: INDENT,
  added: '  + ',
  removed: '  - ',
};

const makeIndent = (deep) => INDENT.repeat(deep);

const stringifyValue = (obj, deep) => {
  const keys = Object.keys(obj);
  const rows = keys.map((key) => {
    const indent = makeIndent(deep) + indentForProperty.unchanged;
    if ((_.isObject(obj[key]))) {
      const value = stringifyValue(obj[key], deep + 1);
      return `${indent}${key}: ${value}`;
    }
    return `${indent}${key}: ${obj[key]}`;
  });

  const braceIndent = makeIndent(deep);
  return `{\n${rows.join('\n')}\n${braceIndent}}`;
};

const checkValueType = (val, deep) => {
  const result = (_.isObject(val))
    ? stringifyValue(val, deep + 1)
    : val;
  return result;
};

const getFormattedNodeNested = (node, deep, iter) => {
  const {
    name,
    children,
  } = node;

  const indent = makeIndent(deep) + indentForProperty.unchanged;
  const nested = iter(children, deep + 1);
  const row = `${name}: ${nested}`;
  return `${indent}${row}`;
};

const getFormattedNodeUnchanged = (node, deep) => {
  const {
    name,
    value,
  } = node;

  const indent = makeIndent(deep) + indentForProperty.unchanged;
  const printedValue = checkValueType(value, deep);
  const row = `${name}: ${printedValue}`;
  return `${indent}${row}`;
};

const getFormattedNodeAdded = (node, deep) => {
  const {
    name,
    value,
  } = node;

  const indent = makeIndent(deep) + indentForProperty.added;
  const printedValue = checkValueType(value, deep);
  const row = `${name}: ${printedValue}`;
  return `${indent}${row}`;
};

const getFormattedNodeRemoved = (node, deep) => {
  const {
    name,
    value,
  } = node;

  const indent = makeIndent(deep) + indentForProperty.removed;
  const printedValue = checkValueType(value, deep);
  const row = `${name}: ${printedValue}`;
  return `${indent}${row}`;
};

const getFormattedNodeUpdated = (node, deep) => {
  const {
    name,
    valueBefore,
    valueAfter,
  } = node;

  const valueBeforeIndent = makeIndent(deep) + indentForProperty.removed;
  const valueAfterIndent = makeIndent(deep) + indentForProperty.added;

  const printedValueBefore = checkValueType(valueBefore, deep);
  const printedValueAfter = checkValueType(valueAfter, deep);

  const result = [];

  const firstRow = `${name}: ${printedValueBefore}`;
  const secondRow = `${name}: ${printedValueAfter}`;

  result.push(`${valueBeforeIndent}${firstRow}`);
  result.push(`${valueAfterIndent}${secondRow}`);
  return result;
};

const mapTypeToNodeFormatter = {
  nested: getFormattedNodeNested,
  unchanged: getFormattedNodeUnchanged,
  added: getFormattedNodeAdded,
  removed: getFormattedNodeRemoved,
  updated: getFormattedNodeUpdated,
};

const genStylishFormattedDiff = (diffInfo) => {
  const iter = (nodes, deep) => {
    const parts = nodes.flatMap((node) => {
      const { type } = node;

      const getFormattedNode = mapTypeToNodeFormatter[type];
      return getFormattedNode(node, deep, iter);
    });
    const braceIndent = makeIndent(deep);
    return `{\n${parts.join('\n')}\n${braceIndent}}`;
  };
  return iter(diffInfo, 0);
};

export default genStylishFormattedDiff;
