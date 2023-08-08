import { Constants } from 'containers/App/constants';
import cuid from 'cuid';
import { fromJS } from 'immutable';

const initialState = fromJS({
  flashMessages: [],
  pageLoading: false,
  modals: [],
  sideModal: false,
});

/* eslint no-param-reassign: 0 */
export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.OPEN_PAGE_LOADING:
      return state.set('pageLoading', true);

    case Constants.CLOSE_PAGE_LOADING:
      return state.set('pageLoading', false);

    case Constants.OPEN_MODAL: {
      if (!action.obj.cuid) {
        action.obj.id = cuid();
      }
      return state.set('modals', state.get('modals').push(action.obj));
    }

    case Constants.CLOSE_MODAL: {
      const MIndex = state
        .get('modals')
        .findIndex((item) => item.id === action.obj.id);
      return state.set('modals', state.get('modals').delete(MIndex));
    }

    case Constants.OPEN_SIDEMODAL:
      return state.set('sideModal', true);

    case Constants.CLOSE_SIDEMODAL:
      return state.set('sideModal', false);

    default:
      return state;
  }
};
