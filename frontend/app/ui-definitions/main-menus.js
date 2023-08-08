import React from 'react';
import { FormattedMessage } from 'react-intl';
import { compact, startsWith, get, isEmpty, some } from 'lodash';

import i18n from 'scenes/utils/i18n';

export const buildSidebarMenu = (company) => {
  return [];
};

export const sidebarMenuProfile = (company) => {
  return compact([
    {
      label: <FormattedMessage {...i18n.settings} />,
      path: '/settings/members',
      icon: 'Gear',
    },
    {
      label: <FormattedMessage {...i18n.support} />,
    },
    {
      label: <FormattedMessage {...i18n.helpCenter} />,
      border: 'bottom',
    },
    {
      label: <FormattedMessage {...i18n.logout} />,
      path: '/logout',
    },
  ]);
};
