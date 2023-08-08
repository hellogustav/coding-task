import { defineMessages } from 'react-intl';

export default defineMessages({
  logInFirst: {
    id: 'app.containers.Login.LogInFirst',
    defaultMessage:
      'You are currently not logged in. Please log in first to open the site.',
  },
  login: {
    id: 'app.containers.Login.login',
    defaultMessage: 'Login',
  },

  loginTokenExpiredError: {
    id: 'app.containers.Login.loginTokenExpiredError',
    defaultMessage: 'Token is expired!',
  },
  missingFieldsValidationDesktop: {
    id: 'app.components.Login.missingFieldsValidationDesktop',
    defaultMessage: 'There are missing fields',
  },
  emailInvalidDesktop: {
    id: 'app.components.Login.emailInvalidDesktop',
    defaultMessage: 'Email address is invalid',
  },
});
