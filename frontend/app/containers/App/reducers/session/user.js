import {
  GET_SESSION_SUCCESS,
  GET_SESSION_VIA_TOKEN_SUCCESS,
} from 'containers/Login/constants';

const initialState = {
  model: null,
  channel: null,
  error: null,
};
export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'USER_CHANNEL_JOINED':
      return {
        ...state,
        model: action.model,
        channel: action.channel,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        model: { ...state.model, ...action.data },
      };

    case GET_SESSION_SUCCESS:
    case GET_SESSION_VIA_TOKEN_SUCCESS:
      return {
        ...state,
        model: action.user,
      };

    case 'USER_CHANNEL_LEFT':
      return initialState;

    default:
      return state;
  }
}
