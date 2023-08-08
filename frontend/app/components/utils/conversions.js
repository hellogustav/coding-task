import { filter, isEmpty, isObject } from 'lodash';

import { nfd } from 'unorm';

import { profileInitialsColors } from './styles/ui';

/* eslint no-bitwise: 0 */
const hashCode = function hashCode(s) {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
};

/**
 * @function colorForText
 * @param {string} text
 * @return {string} color to use
 * @description this function matches an specified color from the color palette to the first
 * letter of the text.
 * It's a simple and quick solution to the InitialProfile ui-component
 */
export const colorForText = function colorForText(text) {
  const normalized = nfd(text);
  const position = hashCode(normalized) % profileInitialsColors.length;

  return profileInitialsColors[position];
};
