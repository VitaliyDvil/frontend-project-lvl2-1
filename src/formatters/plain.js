import lodash from 'lodash';

const { isObject } = lodash;

const valueFormatting = (value) => {
  const result = (isObject(value))
    ? '[complex value]'
    : `'${value}'`;
  return result;
};

const plain = (diffInfo) => {
  const iter = (tree, source = []) => {
    const rows = tree.flatMap((key) => {
      const {
        name,
        value,
        firstValue,
        secondValue,
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
        const printedValue = valueFormatting(value);
        return `${startOfSentence} with value: ${printedValue}`;
      }

      if (type === 'removed') {
        return startOfSentence;
      }

      if (type === 'updated') {
        const printedFirstValue = valueFormatting(firstValue);
        const printedSecondValue = valueFormatting(secondValue);

        return `${startOfSentence}. From ${printedFirstValue} to ${printedSecondValue}`;
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

export default plain;
