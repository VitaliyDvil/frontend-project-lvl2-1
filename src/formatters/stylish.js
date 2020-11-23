import _ from 'lodash';

const INDENT = '    ';

const mapPropertyToUniqIndent = {
  unchanged: INDENT,
  added: '  + ',
  removed: '  - ',
};

const makeIndent = (deep) => INDENT.repeat(deep);

const stringifyValue = (obj, deep) => {
  const keys = Object.keys(obj);
  const rows = keys.map((key) => {
    const indent = makeIndent(deep) + mapPropertyToUniqIndent.unchanged;
    if (_.isObject(obj[key])) {
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

const getFormattedNestedNode = (node, deep, iter) => {
  const {
    name,
    children,
  } = node;

  const indent = makeIndent(deep) + mapPropertyToUniqIndent.unchanged;
  const nested = iter(children, deep + 1);
  const row = `${name}: ${nested}`;
  return `${indent}${row}`;
};

const getFormattedUnchangedNode = (node, deep) => {
  const {
    name,
    value,
  } = node;

  const indent = makeIndent(deep) + mapPropertyToUniqIndent.unchanged;
  const printedValue = checkValueType(value, deep);
  const row = `${name}: ${printedValue}`;
  return `${indent}${row}`;
};

const getFormattedAddedNode = (node, deep) => {
  const {
    name,
    value,
  } = node;

  const indent = makeIndent(deep) + mapPropertyToUniqIndent.added;
  const printedValue = checkValueType(value, deep);
  const row = `${name}: ${printedValue}`;
  return `${indent}${row}`;
};

const getFormattedRemovedNode = (node, deep) => {
  const {
    name,
    value,
  } = node;

  const indent = makeIndent(deep) + mapPropertyToUniqIndent.removed;
  const printedValue = checkValueType(value, deep);
  const row = `${name}: ${printedValue}`;
  return `${indent}${row}`;
};

const getFormattedUpdatedNode = (node, deep) => {
  const {
    name,
    valueBefore,
    valueAfter,
  } = node;

  const valueBeforeIndent = makeIndent(deep) + mapPropertyToUniqIndent.removed;
  const valueAfterIndent = makeIndent(deep) + mapPropertyToUniqIndent.added;

  const printedValueBefore = checkValueType(valueBefore, deep);
  const printedValueAfter = checkValueType(valueAfter, deep);

  const firstRow = `${name}: ${printedValueBefore}`;
  const secondRow = `${name}: ${printedValueAfter}`;

  const result = [
    `${valueBeforeIndent}${firstRow}`,
    `${valueAfterIndent}${secondRow}`,
  ];

  return result;
};

const mapTypeToNodeFormatter = {
  nested: getFormattedNestedNode,
  unchanged: getFormattedUnchangedNode,
  added: getFormattedAddedNode,
  removed: getFormattedRemovedNode,
  updated: getFormattedUpdatedNode,
};

const getStylishOutput = (diffInfo) => {
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

export default getStylishOutput;
