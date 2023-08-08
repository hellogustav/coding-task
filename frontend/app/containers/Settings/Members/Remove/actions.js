import { httpDelete, httpGet } from 'utils';

import { openFlashMessage } from 'components/utils/flashMessages';

import { FlashDefinition } from './scene/utils/flashDefinition';

import {
  MEMBER_REMOVE_REQUEST,
  MEMBER_REMOVE_SUCCESS,
  MEMBER_REMOVE_ERROR,
} from '../constants';

export { fetchAllMembers } from '../List/actions';

export function removeMember(id, params) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch({ type: MEMBER_REMOVE_REQUEST });

      httpDelete(`/company/members/${id}`, params)
        .then(() => {
          dispatch({
            type: MEMBER_REMOVE_SUCCESS,
            payload: { id },
          });
          openFlashMessage(FlashDefinition.removeMemberSuccess);

          resolve({ id });
        })
        .catch((error) => {
          dispatch({
            type: MEMBER_REMOVE_ERROR,
            error,
          });

          reject(error);
        });
    });
}
