import i18n from './i18n';

export const FormDefinition = {
  emailAddress: {
    id: 'user-email',
    ref: 'email',
    label: i18n.emailAddress,
    placeholder: i18n.emailPlaceholder,
    inputType: 'email',
    required: true,
  },
};
