import _ from 'lodash';

const keyType = {
  NESTED: 'nested',
  REMOVED: 'removed',
  ADDED: 'added',
  UNCHANGED: 'unchanged',
  UPDATED: 'updated',
};

const getUnionSortedKeys = (before, after) => {
  const allkeys = _.union(_.keys(before), _.keys(after));
  return _.cloneDeep(allkeys).sort();
};

const getNodeInfo = (name, value, type) => ({ name, value, type });

const buildDiffInfo = (before, after) => {
  const unionKeys = getUnionSortedKeys(before, after);
  return unionKeys.map((key) => {
    if (_.isObject(before[key]) && _.isObject(after[key])) {
      const children = buildDiffInfo(before[key], after[key]);
      return {
        name: key,
        children,
        type: keyType.NESTED,
      };
    }

    if (!_.has(after, key)) {
      return getNodeInfo(key, before[key], keyType.REMOVED);
    }
    if (!_.has(before, key)) {
      return getNodeInfo(key, after[key], keyType.ADDED);
    }
    if (_.isEqual(before[key], after[key])) {
      return getNodeInfo(key, before[key], keyType.UNCHANGED);
    }
    return {
      name: key,
      valueBefore: before[key],
      valueAfter: after[key],
      type: keyType.UPDATED,
    };
  });
};

export default buildDiffInfo;
