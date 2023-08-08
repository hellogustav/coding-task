export const apiHost =
  typeof REST_API_URL === 'undefined' ? process.env.REST_API_URL : REST_API_URL;

const hostTypesRegexp = {
  local: /^localhost$/,
};

function resolveHostType(hostname) {
  const hostType = Object.keys(hostTypesRegexp).find((type) =>
    hostTypesRegexp[type].test(hostname)
  );

  return hostType !== undefined ? hostType : 'unknown';
}
