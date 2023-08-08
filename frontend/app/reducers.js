/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import { globalReducer } from 'containers/App/reducers';
import { languageProviderReducer } from 'containers/LanguageProvider/reducer';
import { loadingBarReducer } from 'react-redux-loading-bar';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
/* eslint no-param-reassign: 0 */
export function createReducer(injectedReducers) {
  const appReducer = combineReducers({
    // TODO: Split `appReducers` into smaller reducers
    // TODO: Combine industries, locations and departments and nest under common name
    // TODO: Capitalize reducer names
    appReducers: globalReducer,
    route: routeReducer,
    language: languageProviderReducer,
    loadingBar: loadingBarReducer,
    ...injectedReducers,
  });

  const rootReducer = (state, action) => {
    if (action.type === 'SIGN_OUT') {
      state = undefined;
    }
    return appReducer(state, action);
  };

  return rootReducer;
}