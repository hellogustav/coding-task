import { emailRegex } from 'utils/regexes';

/**
 * @function isValidEmail
 * @param {string} str
 * @return {boolean}
 *
 * @note the regex was copied from http://emailregex.com/
 */
export const isValidEmail = function isValidEmail(str) {
  return emailRegex.test(str);
};
