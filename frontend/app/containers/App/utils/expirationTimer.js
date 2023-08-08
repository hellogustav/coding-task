import { push } from 'react-router-redux';
import { get } from 'lodash';
import qs from 'qs';

import { getJwtExpiration } from 'utils/authorization/utils/auth';
import { openFlashMessage } from 'components/utils/flashMessages';

import { isLoggingOut } from './helpers';
import { FlashDefinition } from './flashDefinition';

export const sessionExpired = () => {
  const expirationToken = getJwtExpiration();

  if (!expirationToken) {
    return true;
  }
  const expirationSeconds = expirationToken.payload.exp;
  const nowSeconds = Math.ceil(new Date().getTime() / 1000);

  return nowSeconds >= expirationSeconds;
};

export const handleExpirationTimer = (initialExpirationSeconds, dispatch) => {
  if (sessionExpired()) {
    clearExpirationTimer();
    handleSessionExpired(dispatch);
    return;
  }

  const expirationToken = getJwtExpiration();
  const expirationSeconds = expirationToken.payload.exp;
  if (initialExpirationSeconds !== expirationSeconds) {
    setExpirationTimer(dispatch);
  }
};

export const logoutRedirect = (preserveUrl = true) => {
  const path = `${window.location.pathname}${window.location.search}`;

  if (isLoggingOut(window.location)) {
    return `/logout${window.location.search}`;
  }
  return preserveUrl
    ? `/logout?redirect=${encodeURIComponent(path)}`
    : '/logout';
};

export const handleSessionExpired = (dispatch) => {
  openFlashMessage(FlashDefinition.sessionExpired, { id: 'sessionExpired' });
};

export const setExpirationTimer = (dispatch) => {
  clearExpirationTimer();

  const expirationToken = getJwtExpiration();
  if (!expirationToken) {
    return;
  }

  const initialExpirationSeconds = expirationToken.payload.exp;
  const expirationTimer = setTimeout(
    () => handleExpirationTimer(initialExpirationSeconds, dispatch),
    Math.ceil(initialExpirationSeconds - new Date().getTime() / 1000) * 1000
  );
  localStorage.setItem('expirationTimer', expirationTimer);
};

export const clearExpirationTimer = () => {
  const expirationTimer = localStorage.getItem('expirationTimer');

  if (expirationTimer) {
    clearTimeout(parseInt(expirationTimer, 10));
    localStorage.removeItem('expirationTimer');
  }
};
