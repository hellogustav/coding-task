/* eslint no-undef:0 */
import { candidatelyTheme as candidately } from 'themes/candidately/candidately';
import { get, includes, forOwn } from 'lodash';

const themes = {
  candidately,
};

export const THEME = 'candidately';
export default themes[THEME];
