import i18n from './i18n';

export const FlashDefinition = {
  LogInFirst: {
    context: [{ detail: i18n.logInFirst }],
    status: 'info',
  },
  loginTokenExpiredError: {
    context: [{ detail: i18n.loginTokenExpiredError }],
    status: 'error',
  },
  missingFieldsValidation: {
    context: [{ detail: i18n.missingFieldsValidationDesktop }],
    status: 'error',
  },
  emailInvalid: {
    context: [{ detail: i18n.emailInvalidDesktop }],
    status: 'error',
  },
};
