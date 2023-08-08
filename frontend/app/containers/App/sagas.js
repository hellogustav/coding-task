import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { first, get, isNil, map } from 'lodash';
import { warn } from 'js-logger';

import { openFlashMessage } from 'components/utils/flashMessages';
import { openModal } from 'containers/App/actions/ui';

import { FlashDefinition } from 'containers/App/utils/flashDefinition';
import { logoutRedirect } from 'containers/App/utils/expirationTimer';
import { SIGN_IN_ERROR } from 'containers/Login/constants';

export function* handleFailure(action) {
  const { type, error, errorMessage } = action;
  warn(`[Redux] Error action: ${type}`, action);

  if (isNil(error) || isNil(error.response)) return;

  if (error.message === 'Network Error') {
    warn('[API] 0: Connection Problem');

    openFlashMessage(FlashDefinition.NetworkError);
    return;
  }

  if (isNil(error.response.status) && isNil(error.response.data)) return;

  const { status, data } = error.response;
  const errMsgKey = errorMessage || data.error || first(data.errors);

  switch (true) {
    case status === 302:
      warn('[API] 302: Found');

      if (data.redirect_url) {
        yield put(push(data.redirect_url));
      }
      break;

    case status === 401:
    case status === 403:
      warn('[API] 401/403: Unauthorized');

      if (data.error === 'session_expired') {
        yield put(push(logoutRedirect()));
        openFlashMessage(
          get(FlashDefinition, errMsgKey, FlashDefinition.sessionExpired),
          { id: 'sessionExpired' }
        );
        break;
      }

      if (type !== SIGN_IN_ERROR) {
        const preserveUrl = data.error === 'invalid_credentials';
        yield put(push(logoutRedirect(preserveUrl)));
      }

      openFlashMessage(
        get(FlashDefinition, errMsgKey, FlashDefinition.UnauthorizedError)
      );
      break;

    case status === 408:
      warn('[API] 408: Request Timeout');

      openFlashMessage(FlashDefinition.RequestTimeoutError);
      break;

    case status === 418:
      warn('[API] 418: I’m a teapot');

      openFlashMessage(
        get(FlashDefinition, errMsgKey, FlashDefinition.ValidationError)
      );
      break;

    case status === 422:
      warn('[API] 422: Validation Error');

      if (data.error === 'expired_token') {
        openFlashMessage(FlashDefinition.expiredToken);
        yield put(push('/logout'));
      } else if (data.error === 'consumed_email_confirm_token') {
        openFlashMessage(FlashDefinition.consumedEmailConfirmationToken);
        yield put(push('/logout'));
      } else if (data.error === 'consumed_token') {
        openFlashMessage(FlashDefinition.consumedToken);
        yield put(push('/logout'));
      } else if (data.error || (data.errors && data.errors.length === 1)) {
        openFlashMessage(
          get(FlashDefinition, errMsgKey, FlashDefinition.ValidationError)
        );
      }

      if (data.errors && data.errors.length > 1) {
        const errors = map(data.errors, (err) => err.source.pointer);

        // TODO: Implement generic error message lookup, quick fix use code 418
        warn('[API] Multiple errors occurred', errors);
      }
      break;

    case status > 400 && status < 500:
      warn('[API] 4xx: Internal Client Error');

      break;

    case status >= 500:
      warn('[API] 5xx: Internal Server Error');

      break;

    default:
      warn(`[API] ${status}: Unknown Error`);
  }
}

export function* rootSaga() {
  yield takeEvery((action) => /ERROR$/.test(action.type), handleFailure);
}
