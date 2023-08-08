import i18n from 'containers/App/utils/i18n';

export const FlashDefinition = {
  NetworkError: {
    context: [{ detail: i18n.NetworkError }],
    status: 'error',
  },

  UnauthorizedError: {
    context: [{ detail: i18n.UnauthorizedError }],
    status: 'error',
  },

  RequestTimeoutError: {
    context: [{ detail: i18n.RequestTimeoutError }],
    status: 'error',
  },

  ValidationError: {
    context: [{ detail: i18n.ValidationError }],
    status: 'error',
  },

  ResendBlocked: {
    context: [{ detail: i18n.ResendBlocked }],
    status: 'error',
  },

  // BEGIN: Error keys coming from API
  invalid_credentials: {
    context: [{ detail: i18n.ValidationErrorInvalidCredentials }],
    status: 'error',
  },
  account_blocked: {
    context: [{ detail: i18n.ValidationErrorAccountBlocked }],
    status: 'error',
  },
  no_active_membership: {
    context: [{ detail: i18n.ValidationErrorNoActiveMembership }],
    status: 'error',
  },
  invalid_token: {
    context: [{ detail: i18n.ValidationErrorInvalidToken }],
    status: 'error',
  },
  employerInviteError: {
    context: [{ detail: i18n.employerInvitationError }],
    status: 'error',
  },
  supplierInviteError: {
    context: [{ detail: i18n.supplierInvitationError }],
    status: 'error',
  },
  email_associated_with_token: {
    context: [{ detail: i18n.EmailAssociatedWithToken }],
    status: 'error',
  },
  // END

  ClientError: {
    context: [{ detail: i18n.ClientError }],
    status: 'error',
  },

  ServerError: {
    context: [{ detail: i18n.ServerError }],
    status: 'error',
  },

  UnknownError: {
    context: [{ detail: i18n.UnknownError }],
    status: 'error',
  },

  emailAlreadyTaken: {
    context: [{ detail: i18n.emailAlreadyTaken }],
    status: 'error',
  },
  invalidToken: {
    context: [{ detail: i18n.invalidToken }],
    status: 'error',
  },
  expiredToken: {
    context: [{ detail: i18n.expiredToken }],
    status: 'error',
  },
  consumedEmailConfirmationToken: {
    context: [{ detail: i18n.consumedEmailConfirmationToken }],
    status: 'error',
  },
  consumedToken: {
    context: [{ detail: i18n.consumedToken }],
    status: 'error',
  },
  sessionExpired: {
    context: [{ detail: i18n.sessionExpired }],
    status: 'info',
  },
};
