import { defineMessages } from 'react-intl';

export default defineMessages({
  inviteMember: {
    id: 'app.components.Members.inviteMember',
    defaultMessage: 'Invite new user',
  },
  inviteMemberTitle: {
    id: 'app.components.Members.inviteMemberTitle',
    defaultMessage: 'Add contact information',
  },
  sendInvitation: {
    id: 'app.components.Members.sendInvitation',
    defaultMessage: 'Invite user',
  },
  buttonCancel: {
    id: 'app.components.Members.buttonCancel',
    defaultMessage: 'Cancel',
  },
  inviteMemberSuccess: {
    id: 'app.components.Members.flash.inviteMemberSuccess',
    defaultMessage: 'Invitation was sent successfully',
  },
  inviteMemberError: {
    id: 'app.components.Members.flash.inviteMemberError',
    defaultMessage: 'Invitation could not be sent',
  },
  userHasMembershipError: {
    id: 'app.containers.Members.flash.userHasMembershipError',
    defaultMessage: 'Email address is already associated with a membership',
  },
  userHasAccountError: {
    id: 'app.containers.Members.flash.userHasAccountError',
    defaultMessage: 'This user is already part of another company',
  },
  email: {
    id: 'app.components.Members.email',
    defaultMessage: 'Email',
  },
  emailPlaceholder: {
    id: 'app.components.Members.emailPlaceholder',
    defaultMessage: 'Enter email',
  },
  firstName: {
    id: 'app.components.Members.firstName',
    defaultMessage: 'First name',
  },
  firstNamePlaceholder: {
    id: 'app.components.Members.firstNamePlaceholder',
    defaultMessage: 'Enter first name',
  },
  lastName: {
    id: 'app.components.Members.lastName',
    defaultMessage: 'Last name',
  },
  lastNamePlaceholder: {
    id: 'app.components.Members.lastNamePlaceholder',
    defaultMessage: 'Enter last name',
  },
  role: {
    id: 'app.components.Members.role',
    defaultMessage: 'User permission',
  },
  roleDescription: {
    id: 'app.components.Members.roleDescription',
    defaultMessage: 'Select which permission level the user should have',
  },
  rolePlaceholder: {
    id: 'app.components.Members.rolePlaceholder',
    defaultMessage: 'Select user permission',
  },
  roleOwner: {
    id: 'app.components.Members.roleOwner',
    defaultMessage: 'Owner',
  },
  roleAdmin: {
    id: 'app.components.Members.roleAdmin',
    defaultMessage: 'Admin',
  },
  roleMember: {
    id: 'app.components.Members.roleMember',
    defaultMessage: 'Member',
  },
});
