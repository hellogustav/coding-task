import { defineMessages } from 'react-intl';

import theme from 'themes';

export default defineMessages({
  headline: {
    id: 'app.components.Signin.headline',
    defaultMessage: 'Welcome back to {platform}',
  },
  button: {
    id: 'app.components.Signin.button',
    defaultMessage: 'Log me in',
  },
  buttonSubText: {
    id: 'app.components.Signin.buttonSubText',
    defaultMessage: 'Don’t have an account? {link}',
  },
  emailAddress: {
    id: 'app.components.Signin.emailAddress',
    defaultMessage: 'Email Address',
  },
  emailPlaceholder: {
    id: 'app.components.Signin.emailPlaceholder',
    defaultMessage: 'Enter your work email address',
  },
  linkSignUp: {
    id: 'app.components.Signin.linkSignUp',
    defaultMessage: 'Sign up',
  },
  forgotPassword: {
    id: 'app.components.Signin.forgotPassword',
    defaultMessage: 'Forgot password',
  },
  forgotPasswordButton: {
    id: 'app.components.Signin.forgotPasswordButton',
    defaultMessage: 'Continue',
  },
  passwordRecoveryHeadline: {
    id: 'app.components.Signin.passwordRecoveryHeadline',
    defaultMessage: 'Help is on the way',
  },
  passwordRecoverySubHeadline: {
    id: 'app.components.Signin.passwordRecoverySubHeadline',
    defaultMessage: `We've combing through our records to find the ${theme.platformName} account for:`,
  },
  passwordRecoveryNotification: {
    id: 'app.components.Signin.passwordRecoveryNotification',
    defaultMessage:
      'If we find a match, you’ll get an email with further instructions. If you don’t hear from us in the next 15 minutes, please double check that you entered the correct email address and check your spam folder.',
  },
  errorEmailCannotBeEmpty: {
    id: 'app.forgotpassword.errorEmailCannotBeEmpty',
    defaultMessage: 'The email field cannot be empty!',
  },
  errorInvalidEmail: {
    id: 'app.forgotpassword.errorInvalidEmail',
    defaultMessage: 'Email address invalid',
  },
  or: {
    id: 'app.components.Login.misc.or',
    defaultMessage: 'or',
  },
  gustav: {
    infoLoginHeader: {
      id: 'app.components.Login.gustav.infoLoginHeader',
      defaultMessage: 'How to improve your profile?',
    },
    infoCompleteProfileTitle: {
      id: 'app.components.Login.gustav.infoCompleteProfileTitle',
      defaultMessage: 'Complete your company profile',
    },
    infoCompleteProfileText: {
      id: 'app.components.Login.gustav.infoCompleteProfileText',
      defaultMessage:
        'Your company profile is a great way to showcase your business. You can enhance your profile by adding your logo and providing additional information, for example, about the industries you recruit for and by uploading additional documents and certifications.',
    },
    infoCustomAppearanceTitle: {
      id: 'app.components.Login.infoCustomAppearanceTitle',
      defaultMessage: 'Customize your list appearance',
    },
    infoCustomDomainTitle: {
      id: 'app.components.Login.infoCustomDomainTitle',
      defaultMessage: 'Set up your custom domain',
    },
  },
  candidately: {
    infoLoginHeader: {
      id: 'app.components.Login.candidately.infoLoginHeader',
      defaultMessage: 'Real-time activity tracking',
    },
    infoActivityFeedTitle: {
      id: 'app.components.Login.candidately.infoActivityFeedTitle',
      defaultMessage: 'Activity feed',
    },
    infoActivityFeedText: {
      id: 'app.components.Login.candidately.infoActivityFeed',
      defaultMessage:
        'Every time your clients view one of your candidates, you’ll see it live in your activity feed. Click Activity at the top of each list. You can also view activity on a candidate level when you are opening a candidate.',
    },
  },

  youNeedAccount: {
    id: 'app.components.Login.misc.youNeedAccount',
    defaultMessage: `You need a user account to log into ${theme.platformName}`,
  },
  proceedToLogin: {
    id: 'app.components.Login.misc.proceedToLogin',
    defaultMessage: 'Proceed to login',
  },

  username: {
    id: 'app.components.Login.misc.username',
    defaultMessage: '**Username**: {username}',
  },
});
