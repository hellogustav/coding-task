import { combineReducers } from 'redux';
import { membersReducer } from './Members/reducer';

export const settingsReducer = combineReducers({
  members: membersReducer,
});
