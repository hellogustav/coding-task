import { defineMessages } from 'react-intl';

export default defineMessages({
  NetworkError: {
    id: 'app.containers.App.NetworkError',
    defaultMessage: 'There appears to be a problem with your connection',
  },

  UnauthorizedError: {
    id: 'app.containers.App.UnauthorizedError',
    defaultMessage: 'There appears to be a problem with your authorization',
  },

  RequestTimeoutError: {
    id: 'app.containers.App.RequestTimeoutError',
    defaultMessage: 'Your connection has timed out',
  },

  ValidationError: {
    id: 'app.containers.App.ValidationError',
    defaultMessage: 'Server responded with a validation error',
  },
  ResendBlocked: {
    id: 'app.containers.App.ResendBlocked',
    defaultMessage: 'Too many resend attempts. Please try again later.',
  },
  ValidationErrorInvalidCredentials: {
    id: 'app.containers.App.ValidationErrorInvalidCredentials',
    defaultMessage: 'Invalid credentials',
  },
  ValidationErrorAccountBlocked: {
    id: 'app.containers.App.ValidationErrorAccountBlocked',
    defaultMessage: 'Too many failed attempts. Please try again later.',
  },
  ValidationErrorNoActiveMembership: {
    id: 'app.containers.App.ValidationErrorNoActiveMembership',
    defaultMessage: 'Unable to log in. Your company removed you as a user.',
  },
  ValidationErrorInvalidToken: {
    id: 'app.containers.App.ValidationErrorInvalidToken',
    defaultMessage: 'Invalid token',
  },
  EmailAssociatedWithToken: {
    id: 'app.containers.App.EmailAssociatedWithToken',
    defaultMessage:
      'Email address is already associated with an invitation token',
  },
  employerInvitationError: {
    id: 'app.containers.App.employerInvitationError',
    defaultMessage: "Invitation couldn't be sent to the Employer",
  },
  supplierInvitationError: {
    id: 'app.containers.App.supplierInvitationError',
    defaultMessage: "Invitation couldn't be sent to the Vendor",
  },

  ClientError: {
    id: 'app.containers.App.ClientError',
    defaultMessage: 'Internal client error',
  },

  ServerError: {
    id: 'app.containers.App.ServerError',
    defaultMessage: 'Internal server error',
  },
  UnknownError: {
    id: 'app.containers.App.UnknownError',
    defaultMessage: 'Unknown error',
  },

  invalidToken: {
    id: 'app.components.Signup.invalidToken',
    defaultMessage: 'Invalid token',
  },
  expiredToken: {
    id: 'app.components.Signup.expiredToken',
    defaultMessage: 'Link in email expired. Please resend if needed.',
  },
  consumedToken: {
    id: 'app.components.Signup.consumedToken',
    defaultMessage: 'Link in email was already used. Please resend if needed.',
  },
  consumedEmailConfirmationToken: {
    id: 'app.components.Signup.consumedEmailConfirmationToken',
    defaultMessage: 'Email was already confirmed.',
  },
  emailAlreadyTaken: {
    id: 'app.containers.App.ValidationError.emailAlreadyTaken',
    defaultMessage: 'Email address already in use',
  },
  sessionExpired: {
    id: 'app.containers.App.Session.sessionExpired',
    defaultMessage: 'Your session expired. Please log in again to resume.',
  },
});
