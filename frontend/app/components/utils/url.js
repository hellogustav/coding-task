import {
  isString,
  isObject,
  isArray,
  isEmpty,
  map,
  mapValues,
  trim,
  pick,
  reduce,
  omitBy,
  toString,
} from 'lodash';
import qs from 'qs';

import { linkRegex, domainRegex } from 'utils/regexes';

/**
 * @function withProtocol
 * @param {string} url
 * @param {string} protocol
 * @return {string} passed url with protocol, if not present
 */
export const withProtocol = (url, protocol = 'https') => {
  if (isString(url) && url.search(/^http[s]?:\/\//) === -1) {
    return `${protocol}://${url}`;
  }
  return url;
};

/**
 * @function isValidLink
 * @param {string} value
 * @return {boolean}
 */
export const isValidLink = function isValidLink(value) {
  return linkRegex.test(value);
};

/**
 * @function isValidDomain
 * @param {string} value
 * @return {boolean}
 */
export const isValidDomain = function isValidDomain(value) {
  return domainRegex.test(value);
};

/**
 * @function encodeLinkParams
 * @param {object} params
 * @return {object}
 */
export const encodeLinkParams = function encodeLinkParams(params) {
  if (isObject(params)) {
    return mapValues(params, encodeLinkParams);
  }
  if (isArray(params)) {
    return map(params, encodeLinkParams);
  }
  if (params === null) {
    return null;
  }

  return encodeURIComponent(params);
};

/**
 * @function withPreservedParams
 * @param {string} newPath
 * @param {string} currentPath
 * @param {array} preservedParams
 * @param {object} mappedParams
 * @return {string}
 */
export const withPreservedParams = function withPreservedParams(
  newPath,
  currentPath,
  preservedParams,
  mappedParams
) {
  const query = currentPath.split('?')[1];
  const params = qs.parse(trim(query, '?'));
  const mapped = isEmpty(mappedParams)
    ? {}
    : reduce(
        mappedParams,
        (acc, dst, src) => ({ ...acc, [dst]: params[src] }),
        {}
      );
  const picked = preservedParams ? pick(params, preservedParams) : {};

  const combined = {
    ...mapped,
    ...picked,
  };

  const newQuery = omitBy(combined, isEmpty);

  return Object.keys(newQuery).length > 0
    ? `${newPath}?${qs.stringify(newQuery)}`
    : newPath;
};

/**
 * @function toPathname
 * @param {string} url
 * @return {string} pathname
 */
export const toPathname = function toPathname(url) {
  try {
    return new URL(url).pathname.split('/').pop();
  } catch {
    return toString(url).split('/').pop();
  }
};
