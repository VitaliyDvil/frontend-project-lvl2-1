import lodash from 'lodash';

const {
  union,
  keys,
  has,
  isObject,
} = lodash;

const getUnionSortedKeys = (firstFile, secondFile) => {
  const allkeys = union(keys(firstFile), keys(secondFile));
  return allkeys.sort();
};

const getDiffInfo = (name, value, type) => {
  const diffInfo = {
    name,
    value,
    type,
  };
  return diffInfo;
};

const buildDiffInfo = (first, second) => {
  const unionKeys = getUnionSortedKeys(first, second);
  return unionKeys.map((key) => {
    if (isObject(first[key]) && isObject(second[key])) {
      const children = buildDiffInfo(first[key], second[key]);
      return {
        name: key,
        children,
        type: 'nested',
      };
    }

    if (has(first, key) && !has(second, key)) {
      return getDiffInfo(key, first[key], 'removed');
    }
    if (!has(first, key) && has(second, key)) {
      return getDiffInfo(key, second[key], 'added');
    }
    if (first[key] === second[key]) {
      return getDiffInfo(key, first[key], 'unchanged');
    }
    return {
      name: key,
      firstValue: first[key],
      secondValue: second[key],
      type: 'updated',
    };
  });
};

export default buildDiffInfo;
