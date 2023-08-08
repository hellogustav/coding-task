import {
  reduce,
  includes,
  toLower,
  mapKeys,
  camelCase,
  snakeCase,
  isEmpty,
  isArray,
  isObject,
  isString,
  keys,
  every,
  get,
} from 'lodash';

/**
 * @function objectPropsToCamelCase
 * @param {Object} object
 * @return {Object} new Object with properties in camelCase
 */
export const objectPropsToCamelCase = function objectPropsToCamelCase(object) {
  return mapKeys(object, (v, k) => camelCase(k));
};
