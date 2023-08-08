import { personNameRegex } from 'utils/regexes';

export const isValidPersonName = function isValidPersonName(str) {
  return new RegExp(personNameRegex, 'i').test(str);
};
