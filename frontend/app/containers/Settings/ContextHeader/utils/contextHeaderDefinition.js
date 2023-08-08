import React from 'react';
import { compact } from 'lodash';

import { toFormattedText } from 'components/text/Highlight';

import i18n from './i18n';

const contextHeaderDefinition = (tab, intl, company) => {
  switch (tab) {
    case 'company':
    default:
      return {
        title: intl.formatMessage(i18n.companyTitle),
        icon: 'Briefcase',
        helpMessage: intl.formatMessage(i18n.companyHelpMessage),
        helpLinks: [],
        actionButtons: compact([]),
        style: {
          header: {
            minWidth: '70rem',
          },
          helpSection: {
            minWidth: '70rem',
          },
        },
      };
    case 'users':
      return {
        title: intl.formatMessage(i18n.usersTitle),
        icon: 'Users',
        helpMessage: intl.formatMessage(i18n.usersHelpMessage),
        helpLinks: [],
        actionButtons: [
          {
            label: intl.formatMessage(i18n.inviteMember),
            slug: 'add',
            icon: 'Plus',
            color: 'primaryDark',
            path: '/settings/members/invite',
          },
        ],
        style: {
          header: {
            minWidth: '86rem',
          },
          helpSection: {
            minWidth: '86rem',
          },
        },
      };
  }
};

export { contextHeaderDefinition };
