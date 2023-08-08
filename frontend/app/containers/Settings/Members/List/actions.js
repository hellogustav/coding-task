import qs from 'qs';

import { httpGet, httpPut } from 'utils';
import { objectPropsToCamelCase } from 'components/utils/object';
import { openFlashMessage } from 'components/utils/flashMessages';

import { FlashDefinition } from './scene/utils/flashDefinition';
import {
  MEMBERS_FETCH_REQUEST,
  MEMBERS_FETCH_SUCCESS,
  MEMBERS_FETCH_ERROR,
  MEMBER_UPDATE_REQUEST,
  MEMBER_UPDATE_SUCCESS,
  MEMBER_UPDATE_ERROR,
  MEMBER_RESEND_INVITE_REQUEST,
  MEMBER_RESEND_INVITE_SUCCESS,
  MEMBER_RESEND_INVITE_ERROR,
} from '../constants';

export function fetchAllMembers(filters = {}) {
  return fetchMembers(1, 1000, filters);
}

export function fetchMembers(page = 1, perPage = 50, filters = {}) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch({ type: MEMBERS_FETCH_REQUEST });

      const params = { page, per_page: perPage, filters };
      httpGet(`/company/members?${qs.stringify(params)}`)
        .then((response) => {
          const payload = {
            paginate: objectPropsToCamelCase(response.paginate),
            data: response.data.members,
            companyCounter: response.data.total_counter,
          };

          dispatch({
            type: MEMBERS_FETCH_SUCCESS,
            payload,
          });

          resolve(payload);
        })
        .catch((error) => {
          dispatch({
            type: MEMBERS_FETCH_ERROR,
            error,
          });

          reject(error);
        });
    });
}

export function patchMember(id, updates) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch({ type: MEMBER_UPDATE_REQUEST });

      httpPut(`/company/members/${id}`, updates)
        .then(() => {
          dispatch({
            type: MEMBER_UPDATE_SUCCESS,
            payload: { id, updates },
          });
          openFlashMessage(FlashDefinition.updateMemberSuccess);

          resolve({ id, updates });
        })
        .catch((error) => {
          dispatch({
            type: MEMBER_UPDATE_ERROR,
            error,
          });

          reject(error);
        });
    });
}

export function resendInvite(id) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch({ type: MEMBER_RESEND_INVITE_REQUEST });

      httpGet(`/company/members/${id}/resend_invite`)
        .then(() => {
          dispatch({
            type: MEMBER_RESEND_INVITE_SUCCESS,
            payload: { id },
          });
          openFlashMessage(FlashDefinition.reinviteMemberSuccess);

          resolve({ id });
        })
        .catch((error) => {
          dispatch({
            type: MEMBER_RESEND_INVITE_ERROR,
            error,
          });

          reject(error);
        });
    });
}
