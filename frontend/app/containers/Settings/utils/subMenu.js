import React from 'react';
import { FormattedMessage } from 'react-intl';
import { startsWith, compact } from 'lodash';

import i18n from './i18n';

export const subMenu = (userRole, company) => {
  const isNotMember = userRole !== 'member';

  return {
    title: <FormattedMessage {...i18n.settingsTitle} />,
    slug: 'settings',
    items: compact([
      isNotMember && {
        label: i18n.general,
        path: '/settings/members',
        slug: 'general',
        isActive: (match, { pathname }) =>
          match || startsWith(pathname, '/settings/members'),
        isOpen: true,
        items: compact([
          {
            label: i18n.usersTitle,
            slug: 'users',
            path: '/settings/members',
            icon: 'Users',
          },
        ]),
      },
    ]),
  };
};
