import yaml from 'js-yaml';

export default (file) => yaml.safeLoad(file);
