export const PUBLIC_PATHS = ['/login', '/404', '/401', '/logout'];

// TOP ADMIN LEVEL FOR ALL COMPANIES:
const commonAuthorizedPaths = ['/'];

// SHARED FEATURES FOR ALL COMPANY TYPES:
const commonFeaturesAuthorizedPaths = [
  '/settings',
  '/settings/members',
  '/settings/members/invite',
  '/settings/members/\\w*/remove',
];

export const getAuthorizedPaths = () => {
  return [...commonAuthorizedPaths, ...commonFeaturesAuthorizedPaths];
};
