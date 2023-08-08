import { map } from 'lodash';

import i18n from './i18n';
import { ROLES } from './constants';

const toIntlOptions = (option) => ({
  label: i18n[option],
  value: option,
});

const optionsForRole = map(ROLES, toIntlOptions);

optionsForRole.unshift({ value: '', label: i18n.allRoles });

export { optionsForRole };
