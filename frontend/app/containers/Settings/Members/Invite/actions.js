import { push } from 'react-router-redux';
import { get, compact } from 'lodash';

import { httpGet, httpPost } from 'utils';
import { openFlashMessage } from 'components/utils/flashMessages';

import { FlashDefinition } from './scene/utils/flashDefinition';
import {
  MEMBER_INVITE_REQUEST,
  MEMBER_INVITE_SUCCESS,
  MEMBER_INVITE_ERROR,
} from '../constants';

export function inviteMember(params) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch({ type: MEMBER_INVITE_REQUEST });

      httpPost('/company/members', params)
        .then(({ id }) => {
          const payload = {
            member: {
              id,
              first_name: params.user.first_name,
              last_name: params.user.last_name,
              role: params.role,
              email: params.user.email,
              invite_pending: true,
            },
          };

          dispatch({
            type: MEMBER_INVITE_SUCCESS,
            payload,
          });
          openFlashMessage(FlashDefinition.inviteMemberSuccess);
          dispatch(push('/settings/members'));

          resolve(payload);
        })
        .catch((error) => {
          const reason = get(error, 'response.data.error');
          if (reason === 'user_has_membership') {
            openFlashMessage(FlashDefinition.userHasMembershipError);
          } else if (reason === 'user_has_account') {
            openFlashMessage(FlashDefinition.userHasAccountError);
          } else {
            dispatch({
              type: MEMBER_INVITE_ERROR,
              error,
            });
          }

          reject(error);
        });
    });
}
