import { defineMessages } from 'react-intl';

import theme from 'themes';

export default defineMessages({
  companyTitle: {
    id: 'app.components.Settings.Header.companyTitle',
    defaultMessage: 'Company',
  },
  companyHelpMessage: {
    id: 'app.components.Settings.Header.companyHelpMessage',
    defaultMessage:
      'This section allows you to change general company information. Changes apply to all users.',
  },
  usersTitle: {
    id: 'app.components.Settings.Header.usersTitle',
    defaultMessage: 'Users',
  },
  usersHelpMessage: {
    id: 'app.components.Settings.Header.usersHelpMessage',
    defaultMessage:
      "Here you can manage your company's users. You can invite, change permissions and remove users from your company.",
  },
  helpLinkUsers1: {
    id: 'app.components.Settings.Header.helpLinkUsers1',
    defaultMessage: 'How to invite new users',
  },
  helpLinkUsers2: {
    id: 'app.components.Settings.Header.helpLinkUsers2',
    defaultMessage: 'Learn more about user roles and permissions',
  },
  inviteMember: {
    id: 'app.components.Members.inviteMember',
    defaultMessage: 'Invite user',
  },

  learnMore: {
    id: 'app.containers.Settings.Header.learnMore',
    defaultMessage: 'Learn more',
  },
});
