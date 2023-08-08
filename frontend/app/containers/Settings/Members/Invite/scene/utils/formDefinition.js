import { reject, includes } from 'lodash';
import i18n from './i18n';

export const RolesDefinition = [
  {
    linkName: i18n.roleOwner,
    slug: 'owner',
  },
  {
    linkName: i18n.roleAdmin,
    slug: 'admin',
  },
  {
    linkName: i18n.roleMember,
    slug: 'member',
  },
];

export const availableRolesDefinition = (currentRole, rolesDefinition) =>
  currentRole === 'owner'
    ? rolesDefinition
    : reject(rolesDefinition, { slug: 'owner' });

export const formDefinition = (currentRole) => ({
  email: {
    id: 'email',
    ref: 'email',
    label: i18n.email,
    placeholder: i18n.emailPlaceholder,
    inputType: 'email',
    required: true,
  },
  firstName: {
    id: 'first_name',
    ref: 'firstName',
    label: i18n.firstName,
    placeholder: i18n.firstNamePlaceholder,
    inputType: 'first_name',
    required: true,
  },
  lastName: {
    id: 'last_name',
    ref: 'lastName',
    label: i18n.lastName,
    placeholder: i18n.lastNamePlaceholder,
    inputType: 'last_name',
    required: true,
  },
  role: {
    id: 'role',
    ref: 'role',
    label: i18n.role,
    inputDescription: i18n.roleDescription,
    inputType: 'option',
    required: true,
    selected: 'none',
    listWithoutPlaceholder: true,
    placeholder: {
      slug: 'none',
      linkName: i18n.rolePlaceholder,
    },
    options: availableRolesDefinition(currentRole, RolesDefinition),
  },
});
