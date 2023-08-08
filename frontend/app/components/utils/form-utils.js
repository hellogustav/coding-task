import {
  isBoolean,
  isDate,
  isEmpty,
  isString,
  isObject,
  isArray,
  isNumber,
  uniq,
  isFunction,
  has,
} from 'lodash';

import { isValidEmail } from './email';
import { isValidPersonName } from './name';

/**
 * @function typeSpecificValidations
 * @param {string|number|bool} value
 * @param {string} type
 */
function typeSpecificValidations(value, type, required = false) {
  if (type === 'email') {
    return !isValidEmail(value);
  }
  if (type === 'number') {
    return !isNumber(Number.parseFloat(value));
  }

  return false;
}

export function valueDontExist(value) {
  if (value === undefined || value === null) {
    return true;
  }

  if (isString(value) && (value.match(/\S/) === null || value === 'none')) {
    return true;
  }

  if (isObject(value) && isEmpty(value)) {
    return true;
  }

  if (isArray(value) && isEmpty(value)) {
    return true;
  }

  return false;
}

/**
 * @function isValid
 * @param {object} property
 * @param {string|number|bool} property.inputValue
 * @param {boolean} property.shouldValidate
 * @param {string} property.inputType
 * @param {boolean} property.required
 * @param {number} property.min
 * @return {boolean}
 */
export const isValid = function isValid(property) {
  const {
    inputValue,
    shouldValidate = true,
    inputType = 'text',
    required = false,
    min,
    max,
    customValidation = undefined,
  } = property;

  if (!shouldValidate) {
    return true;
  }

  if (!required && valueDontExist(inputValue)) {
    return true;
  }

  if (required && valueDontExist(inputValue)) {
    return false;
  }

  if (inputType === 'number' && min && isNumber(min) && inputValue < min) {
    return false;
  }

  if (isBoolean(inputValue)) {
    return inputValue;
  }

  if (isObject(inputValue) && isEmpty(inputValue)) {
    return false;
  }

  if (typeSpecificValidations(inputValue, inputType, required)) {
    return false;
  }

  return true;
};

/**
 * @function isPropertyInvalid
 * @param {object} property
 * @param {object} property.obj
 * @param {string} property.key
 * @param {string} property.fieldType
 * @param {boolean} property.required
 * @return {boolean} obj[key] is invalid
 */
export function isPropertyInvalid({
  obj,
  key,
  fieldType = 'text',
  required = false,
}) {
  const blankField = valueDontExist(obj[key]);

  if (required && blankField) {
    return true;
  }

  if (!required && blankField) {
    return false;
  }

  return typeSpecificValidations(obj[key], fieldType, required);
}

/**
 * @function anyPropertyInvalid
 * @param {object} state
 * @param {object} fields
 * @param {function} customValidation if you want to test only an
 *  specific field for others return null;
 * @return {boolean} check if any property of state is invalid
 */
export function anyPropertyInvalid(state, fields, customValidation) {
  return Object.keys(fields).some((definition) => {
    const customValidationError = customValidation
      ? customValidation(definition, state, fields[definition])
      : null;

    return (
      customValidationError ||
      isPropertyInvalid({
        obj: state,
        key: definition,
        fieldType: fields[definition].inputType,
        required: fields[definition].required,
      })
    );
  });
}

/**
 * @param {object} state
 * @param {object} fields
 * @param {function} customErrors
 * @return {array} array of error keys
 */
export function getErrors(state, fields, customErrors) {
  const errors = Object.keys(fields).reduce((acc, definition) => {
    const blankField = valueDontExist(state[definition]);
    const { required, inputType } = fields[definition];
    const value = state[definition];

    if (required && blankField) {
      acc.push('missingFieldsValidation');
    }
    if (!blankField) {
      if (inputType === 'email' && !isValidEmail(value)) {
        acc.push('emailInvalid');
      }
      if (inputType === 'password' && !state.passwordValid) {
        acc.push('passwordWeak');
      }
      if (inputType === 'first_name' && !isValidPersonName(value)) {
        acc.push('firstNameInvalid');
      }
      if (inputType === 'last_name' && !isValidPersonName(value)) {
        acc.push('lastNameInvalid');
      }
    }

    return acc;
  }, []);

  const customErrorKeys = customErrors ? customErrors(state) : [];
  return uniq([].concat(errors, customErrorKeys));
}

export const anyPropertyFilled = (state, fields) =>
  Object.keys(fields).some((definition) => !isEmpty(state[definition]));
