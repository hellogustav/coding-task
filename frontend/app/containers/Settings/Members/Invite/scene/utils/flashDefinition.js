import i18n from './i18n';

export const FlashDefinition = {
  inviteMemberSuccess: {
    context: [{ detail: i18n.inviteMemberSuccess }],
    status: 'success',
  },
  userHasMembershipError: {
    context: [{ detail: i18n.userHasMembershipError }],
    status: 'error',
  },
  userHasAccountError: {
    context: [{ detail: i18n.userHasAccountError }],
    status: 'error',
  },
};
