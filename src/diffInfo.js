import _ from 'lodash';

const getUnionSortedKeys = (before, after) => {
  const allkeys = _.union(_.keys(before), _.keys(after));
  return [...allkeys].sort();
};

const getDiffInfo = (name, value, type) => ({ name, value, type });

const buildDiffInfo = (before, after) => {
  const unionKeys = getUnionSortedKeys(before, after);
  return unionKeys.map((key) => {
    if (_.isObject(before[key]) && _.isObject(after[key])) {
      const children = buildDiffInfo(before[key], after[key]);
      return {
        name: key,
        children,
        type: 'nested',
      };
    }

    if (!_.has(after, key)) {
      return getDiffInfo(key, before[key], 'removed');
    }
    if (!_.has(before, key)) {
      return getDiffInfo(key, after[key], 'added');
    }
    if (before[key] === after[key]) {
      return getDiffInfo(key, before[key], 'unchanged');
    }
    return {
      name: key,
      valueBefore: before[key],
      valueAfter: after[key],
      type: 'updated',
    };
  });
};

export default buildDiffInfo;
