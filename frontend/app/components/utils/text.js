import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  map,
  split,
  isEmpty,
  isString,
  isObject,
  flatten,
  trim,
  lowerCase,
} from 'lodash';

/**
 * @function isEmpty
 * @param {string} value
 * @return {boolean}
 */
export const isEmptyString = function isEmptyString(value) {
  return !value || value.trim() === '';
};

export const toFormattedMessage = function toFormattedMessage(
  text,
  intl,
  values = {}
) {
  if (React.isValidElement(text) || isString(text)) {
    return text;
  }

  if (isObject(text) && text.defaultMessage && intl) {
    return intl.formatMessage(text, values);
  }

  if (isObject(text) && text.defaultMessage) {
    return <FormattedMessage {...text} values={values} />;
  }

  return text;
};
