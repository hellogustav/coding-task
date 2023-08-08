import { combineReducers } from 'redux';
import { session } from './session/session';
import { uiReducer } from './ui';
import { authReducer } from './auth';

export const globalReducer = combineReducers({
  session,
  ui: uiReducer,
  auth: authReducer,
});
