import { push } from 'react-router-redux';
import { trim, get } from 'lodash';
import qs from 'qs';

import { httpGet, httpPost, httpPatch } from 'utils';
import * as UiActions from 'containers/App/actions/ui';
import {
  Actions,
  setUpAndJoinDefaultChannels,
} from 'containers/App/actions/sessions';
import { openFlashMessage } from 'components/utils/flashMessages';

import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_ERROR } from './constants';
import { FlashDefinition } from './utils/flashDefinition';

export const signIn = (params) => (dispatch) => {
  dispatch(UiActions.openPageLoading());

  localStorage.removeItem('inviteToken');

  const data = {
    session: {
      email: params.email,
      password: params.password,
      company_name: params.company,
    },
  };

  dispatch({ type: SIGN_IN_REQUEST });

  httpPost('/sessions', data)
    .then((response) => {
      dispatch(UiActions.closePageLoading());
      const { jwt, exp, user, company } = response;

      localStorage.setItem('phoenixAuthToken', jwt);
      localStorage.setItem('phoenixExpToken', exp);

      dispatch({ type: SIGN_IN_SUCCESS, ...response });

      setUpAndJoinDefaultChannels(dispatch, user, company);

      dispatch(push('/settings/members'));
    })
    .catch((error) => {
      if (get(error, 'response.data.redirectTo')) {
        redirectTo(error.response.data.redirectTo);
      } else {
        dispatch(UiActions.closePageLoading());
        dispatch({ type: SIGN_IN_ERROR, error });
      }
    });
};

const redirectTo = (redirectToUrl) => {
  if (typeof URLSearchParams !== 'undefined' && typeof URL !== 'undefined') {
    const currentUrlParams = new URLSearchParams(window.location.search);
    const redirectUrl = new URL(redirectToUrl);
    currentUrlParams.forEach((value, param) =>
      redirectUrl.searchParams.append(param, value)
    );

    window.location.href = redirectUrl.toString();
  } else {
    window.location.href = redirectToUrl;
  }
};
