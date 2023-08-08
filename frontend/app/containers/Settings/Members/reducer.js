import { find, filter } from 'lodash';
import {
  MEMBERS_FETCH_SUCCESS,
  MEMBER_INVITE_SUCCESS,
  MEMBER_UPDATE_SUCCESS,
  MEMBER_REMOVE_SUCCESS,
} from './constants';

const initialState = {
  members: [],
  paginate: {},
};

export function membersReducer(state = initialState, action) {
  switch (action.type) {
    case MEMBERS_FETCH_SUCCESS:
      return {
        members: action.payload.data,
        paginate: action.payload.paginate,
      };

    case MEMBER_INVITE_SUCCESS:
      return {
        members: [action.payload.member, ...state.members],
        paginate: {
          ...state.paginate,
          totalCount: state.paginate.totalCount + 1,
        },
      };

    case MEMBER_UPDATE_SUCCESS:
      return {
        ...state,
        members: state.members.map((m) =>
          m.id === action.payload.id ? { ...m, ...action.payload.updates } : m
        ),
      };

    case MEMBER_REMOVE_SUCCESS:
      return {
        members: state.members.filter((m) => m.id !== action.payload.id),
        paginate: {
          ...state.paginate,
          totalCount: state.paginate.totalCount - 1,
        },
      };

    default:
      return state;
  }
}
