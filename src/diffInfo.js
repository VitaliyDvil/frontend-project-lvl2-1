import _ from 'lodash';
import { KeyType } from './utils.js';

const getUnionSortedKeys = (before, after) => {
  const allkeys = _.union(_.keys(before), _.keys(after));
  return _.sortBy(allkeys);
};

const getNodeInfo = (name, value, type) => ({ name, value, type });

const buildDiffInfo = (before, after) => {
  const unionKeys = getUnionSortedKeys(before, after);
  return unionKeys.map((key) => {
    if (!_.has(after, key)) {
      return getNodeInfo(key, before[key], KeyType.REMOVED);
    }

    if (!_.has(before, key)) {
      return getNodeInfo(key, after[key], KeyType.ADDED);
    }

    if (_.isObject(before[key]) && _.isObject(after[key])) {
      const children = buildDiffInfo(before[key], after[key]);
      return {
        name: key,
        children,
        type: KeyType.NESTED,
      };
    }

    if (_.isEqual(before[key], after[key])) {
      return getNodeInfo(key, before[key], KeyType.UNCHANGED);
    }
    return {
      name: key,
      valueBefore: before[key],
      valueAfter: after[key],
      type: KeyType.UPDATED,
    };
  });
};

export default buildDiffInfo;
