import { push } from 'react-router-redux';
import { get, some } from 'lodash';
import qs from 'qs';

import { httpGet, httpPatch, httpPost } from 'utils';

import * as UiActions from 'containers/App/actions/ui';
import { openFlashMessage } from 'components/utils/flashMessages';
import {
  GET_SESSION_REQUEST,
  GET_SESSION_SUCCESS,
  GET_SESSION_ERROR,
} from 'containers/Login/constants';

export const setUpAndJoinDefaultChannels = (dispatch, user, company) => {
  dispatch({
    type: 'SOCKET_CONNECTED',
    socket: 'socket',
  });
  dispatch({
    type: 'USER_CHANNEL_JOINED',
    model: user,
    channel: { socket: 'socket' },
  });
  dispatch({
    type: 'COMPANY_CHANNEL_JOINED',
    model: company,
    channel: { socket: 'socket' },
  });
};

export const Actions = {
  currentSession: () => (dispatch) => {
    dispatch(UiActions.openPageLoading());
    dispatch({
      type: GET_SESSION_REQUEST,
    });
    httpGet('/current_session')
      .then((data) => {
        const { user, company } = data;

        setUpAndJoinDefaultChannels(dispatch, user, company);

        dispatch({
          type: GET_SESSION_SUCCESS,
          ...data,
        });

        dispatch(UiActions.closePageLoading());
      })
      .catch((error) => {
        dispatch(UiActions.closePageLoading());
        dispatch({
          type: GET_SESSION_ERROR,
          error,
        });
        console.log(error);
        localStorage.removeItem('phoenixAuthToken');
        localStorage.removeItem('phoenixExpToken');
      });
  },
};
