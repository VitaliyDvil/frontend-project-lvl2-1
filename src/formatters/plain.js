import _ from 'lodash';

const getPrintedValue = (value) => {
  const result = (_.isObject(value))
    ? '[complex value]'
    : `'${value}'`;
  return result;
};

const plainFormatter = (diffInfo) => {
  const iter = (tree, source = []) => {
    const rows = tree.flatMap((key) => {
      const {
        name,
        value,
        valueBefore,
        valueAfter,
        type,
        children,
      } = key;

      if (type === 'unchanged') {
        return [];
      }

      source.push(name);
      const sourceProperty = `'${source.join('.')}'`;
      source.pop();

      const startOfSentence = `property ${sourceProperty} was ${type}`;

      if (type === 'added') {
        const printedValue = getPrintedValue(value);
        return `${startOfSentence} with value: ${printedValue}`;
      }

      if (type === 'removed') {
        return startOfSentence;
      }

      if (type === 'updated') {
        const printedValueBefore = getPrintedValue(valueBefore);
        const printedValueAfter = getPrintedValue(valueAfter);

        return `${startOfSentence}. From ${printedValueBefore} to ${printedValueAfter}`;
      }

      source.push(name);
      const nested = iter(children, source);
      source.pop();
      return nested;
    });
    return rows.join('\n');
  };
  return iter(diffInfo);
};

export default plainFormatter;
