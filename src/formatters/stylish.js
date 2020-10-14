import _ from 'lodash';

const { isObject } = _;

const INDENT = '    ';

const makeIndent = (deep) => INDENT.repeat(deep);

const makeObjAsString = (obj, deep) => {
  const keys = Object.keys(obj);
  const rows = keys.map((key) => {
    const indent = makeIndent(deep);
    const row = ((isObject(obj[key])))
      ? `${key}: ${makeObjAsString(obj[key], deep + 1)}`
      : `${key}: ${obj[key]}`;
    return `${indent}${row}`;
  });

  const braceIndent = makeIndent(deep - 1);
  return `{\n${rows.join('\n')}\n${braceIndent}}`;
};

const checkValueType = (val, deep) => {
  const result = (isObject(val))
    ? makeObjAsString(val, deep + 1)
    : val;
  return result;
};

const formatter = (diffInfo) => {
  const iter = (tree, deep) => {
    const parts = tree.flatMap((key) => {
      const {
        name,
        value,
        firstValue,
        secondValue,
        type,
        children,
      } = key;

      const indent = makeIndent(deep);

      if (type === 'nested') {
        const nested = iter(children, deep + 1);
        const row = `${name}: ${nested}`;
        return `${indent}${row}`;
      }

      if (type === 'unchanged') {
        const printerValue = checkValueType(value, deep);
        const row = `${name}: ${printerValue}`;
        return `${indent}${row}`;
      }

      if (type === 'added') {
        const printerValue = checkValueType(value, deep);
        const row = `+ ${name}: ${printerValue}`;
        return `${indent.slice(2)}${row}`;
      }

      if (type === 'deleted') {
        const printerValue = checkValueType(value, deep);
        const row = `- ${name}: ${printerValue}`;
        return `${indent.slice(2)}${row}`;
      }
      const printerFirstValue = checkValueType(firstValue, deep);
      const printerSecondValue = checkValueType(secondValue, deep);

      const result = [];

      const firstRow = `- ${name}: ${printerFirstValue}`;
      const secondRow = `+ ${name}: ${printerSecondValue}`;

      result.push(`${indent.slice(2)}${firstRow}`);
      result.push(`${indent.slice(2)}${secondRow}`);
      return result;
    });
    const braceIndent = makeIndent(deep - 1);
    return `{\n${parts.join('\n')}\n${braceIndent}}`;
  };

  return iter(diffInfo, 1);
};

export default formatter;
