import i18n from './i18n';

export const FormDefinition = {
  email: {
    id: 'user-email',
    ref: 'email',
    label: i18n.email,
    placeholder: i18n.emailPlaceholder,
    inputType: 'email',
    required: true,
  },
  password: {
    id: 'user-password',
    ref: 'password',
    label: i18n.password,
    placeholder: i18n.passwordPlaceholder,
    inputType: 'password',
    required: true,
    maxlength: 64,
  },
};
