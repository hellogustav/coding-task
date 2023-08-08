import { get } from 'lodash';

const initialState = {
  model: null,
  channel: null,
};

export function companyReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'COMPANY_CHANNEL_JOINED':
      return {
        ...state,
        model: action.model,
        channel: action.channel,
      };

    case 'COMPANY_CHANNEL_LEFT':
      return initialState;

    default:
      return state;
  }
}
