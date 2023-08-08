import { endsWith, forEach, forOwn, isNil } from 'lodash';

if (process.env.NODE_ENV !== 'test') {
  require('formdata-polyfill'); // eslint-disable-line
}

/**
 * @function getPropertyValue
 * @param {object} object
 * @param {array} propertyPath
 *   (e.g ['name'] or ['employer', 'name'] or ['candidates', 2, 'name'])
 *   in the last example 2 is the index to get
 * @return {} value associated to property
 * @description it's a recursive function that navigates
 * the object until it gets the value of the propertyPath
 */
export function getPropertyValue(object, propertyPath) {
  if (!object) {
    return null;
  }

  if (propertyPath.length === 1) {
    return object[propertyPath];
  }

  const objectToRecurse = object[propertyPath[0]];

  return getPropertyValue(objectToRecurse, propertyPath.slice(1));
}

export function getSelectValue(value) {
  return value === 'none' ? null : value;
}

/**
 * @function valueForProperty
 * @param {string} propertyRoute (e.g. salary.min)
 *   (e.g 'name' or 'employer.name' or 'candidates.2.name')
 *   in the last example 2 is the index to get
 * @param {} defaultValue - value to assign to property of obj with propertyRoute param
 * @param {object} editObj - obj to use to map propertyRoute
 * @return {} defaultValue || propertyValue
 */
export function valueForProperty(propertyRoute, defaultValue, editObj) {
  if (!editObj) {
    return defaultValue;
  }

  const propertyValue = getPropertyValue(editObj, propertyRoute.split('.'));

  return isNil(propertyValue) ? defaultValue : propertyValue;
}
