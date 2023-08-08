import { find, last, reduce } from 'lodash';

const jwtProp = function jwtProp(prop) {
  const token = getJwt();

  if (!token) {
    return undefined;
  }

  const foundProp = find(token.payload.sub.split('+'), (part) =>
    part.includes(prop)
  );

  return foundProp ? last(foundProp.split(':')) : null;
};

export const decodeBase64 = function decodeBase64(base64) {
  return JSON.parse(atob(base64));
};

const getToken = (tokenKey) => {
  const item = localStorage.getItem(tokenKey);
  if (item === null) {
    return undefined;
  }
  const [header, payload] = item.split('.');

  return {
    header: decodeBase64(header),
    payload: decodeBase64(payload),
  };
};

export const getJwt = () => getToken('phoenixAuthToken');

export const getJwtExpiration = () => getToken('phoenixExpToken');

export const userRole = function userRole() {
  return jwtProp('Role');
};

export const companyID = function companyID() {
  return jwtProp('Company');
};

export const userID = function userID() {
  return jwtProp('User');
};

export const userEmail = function userEmail() {
  const email = jwtProp('Email');

  return email ? decodeURIComponent(email) : email;
};
