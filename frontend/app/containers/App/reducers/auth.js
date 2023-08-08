import {
  GET_SESSION_REQUEST,
  GET_SESSION_SUCCESS,
  GET_SESSION_ERROR,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  GET_SESSION_VIA_TOKEN_REQUEST,
  GET_SESSION_VIA_TOKEN_SUCCESS,
  GET_SESSION_VIA_TOKEN_ERROR,
} from 'containers/Login/constants';

import { Constants } from '../constants';

const initialState = {
  isFetching: false,
  authenticated: false,
  permissions: false,
  companyType: false,
  membershipRole: null,
  adminMembershipId: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
    case GET_SESSION_REQUEST:
    case GET_SESSION_VIA_TOKEN_REQUEST:
      return { ...state, isFetching: true };

    case SIGN_IN_ERROR:
    case GET_SESSION_ERROR:
    case GET_SESSION_VIA_TOKEN_ERROR:
      return { ...state, isFetching: false };

    case SIGN_IN_SUCCESS:
    case GET_SESSION_SUCCESS:
    case GET_SESSION_VIA_TOKEN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        authenticated: true,
        membershipRole: action.role,
      };

    default:
      return state;
  }
};
