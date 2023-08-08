import {
  GET_SESSION_SUCCESS,
  GET_SESSION_VIA_TOKEN_SUCCESS,
} from 'containers/Login/constants';

import { userReducer as User } from './user';
import { companyReducer as Company } from './company';

const sessionInitialState = {
  socket: null,
  user: User(),
  company: Company(),
  error: null,
};

export const session = (state = sessionInitialState, action) => {
  switch (action.type) {
    case 'SOCKET_CONNECTED':
      return {
        ...state,
        socket: action.socket,
        error: null,
      };

    case 'USER_CHANNEL_JOINED':
    case 'USER_CHANNEL_LEFT':
    case GET_SESSION_SUCCESS:
    case GET_SESSION_VIA_TOKEN_SUCCESS:
      return {
        ...state,
        user: User(state.user, action),
      };

    case 'COMPANY_CHANNEL_JOINED':
    case 'COMPANY_CHANNEL_LEFT':
      return {
        ...state,
        company: Company(state.company, action),
      };

    default:
      return state;
  }
};
