import { defineMessages } from 'react-intl';

export default defineMessages({
  removeMember: {
    id: 'app.components.Members.Remove.removeMember',
    defaultMessage: 'Remove user',
  },
  title: {
    id: 'app.components.Members.Remove.title',
    defaultMessage: 'Remove {user} from {company}',
  },
  titleNoOwhership: {
    id: 'app.components.Members.Remove.titleNoOwhership',
    defaultMessage: 'Are you sure you want to delete {firstName} {lastName}?',
  },
  subtitle: {
    id: 'app.components.Members.Remove.subtitle',
    defaultMessage:
      'Before removing {first_name} from your company, please reassign the following:',
  },
  subtitleNoOwhership: {
    id: 'app.components.Members.Remove.subtitleNoOwhership',
    defaultMessage:
      'Submitted candidates and messages will remain visible to the rest of your company. There are no jobs or Hotlist candidates assigned to this user.',
  },

  hotlistTitle: {
    id: 'app.components.Members.Remove.hotlistTitle',
    defaultMessage: 'Active Hotlist candidates ({count})',
  },
  hotlistLabel: {
    id: 'app.components.Members.Remove.hotlistLabel',
    defaultMessage:
      'Please select the user you want to assign {first_name}’s active Hotlist candidates:',
  },
  jobsTitle: {
    id: 'app.components.Members.Remove.jobsTitle',
    defaultMessage: 'Open jobs ({count})',
  },
  jobsLabel: {
    id: 'app.components.Members.Remove.jobsLabel',
    defaultMessage:
      'Please select the user you want to assign {first_name}’s open jobs:',
  },
  sharedistsTitle: {
    id: 'app.components.Members.Remove.sharedistsTitle',
    defaultMessage: 'List and candidate ownership ({count})',
  },
  sharedistsLabel: {
    id: 'app.components.Members.Remove.sharedistsLabel',
    defaultMessage: `Please select the user to whom you want to assign the ownership of {first_name}’s lists and candidates:`,
  },
  placeholder: {
    id: 'app.components.Members.Remove.placeholder',
    defaultMessage: 'Select user',
  },

  buttonCancel: {
    id: 'app.components.Members.Remove.buttonCancel',
    defaultMessage: 'Cancel',
  },
  buttonRemove: {
    id: 'app.components.Members.Remove.buttonRemove',
    defaultMessage: 'Remove user',
  },

  removeMemberSuccess: {
    id: 'app.components.Members.flash.removeMemberSuccess',
    defaultMessage: 'User was removed successfully',
  },
  removeMemberError: {
    id: 'app.components.Members.flash.removeMemberError',
    defaultMessage: 'Member could not be removed',
  },
});
