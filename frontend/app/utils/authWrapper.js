import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'react-router-redux';
import { filter } from 'lodash';

import { Loading } from '../components/feedback/loading/loading';

import {
  getAuthorizedPaths,
  PUBLIC_PATHS,
} from './authorization/authConstants';

// Level 0 Public

// Level 1
export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: (state) => state.toJS().appReducers.auth.authenticated,
  authenticatingSelector: (state) => state.toJS().appReducers.auth.isFetching,
  AuthenticatingComponent: Loading,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
});

let transition = false;
const checkPermission = function checkPermission(state) {
  transition = true;
  const route = window.location;

  const publicPaths = filter(PUBLIC_PATHS, (path) => {
    const pathToMatch = new RegExp(`^${path}$`);
    return route.pathname.match(pathToMatch) !== null;
  });
  if (publicPaths.length > 0) {
    transition = false;
    return true;
  }
  const authorizedPaths = getAuthorizedPaths();
  const existPath = filter(authorizedPaths, (path) => {
    const pathToMatch = new RegExp(`^${path}$`);
    return route.pathname.match(pathToMatch) !== null;
  });
  transition = false;
  return existPath.length > 0;
};

// Level 2
/* eslint no-unused-vars: 0 */
export const userHasPermission = connectedRouterRedirect({
  redirectPath: '/404',
  allowRedirectBack: false,
  authenticatedSelector: (state) => checkPermission(state.toJS()),
  authenticatingSelector: (state) => transition,
  AuthenticatingComponent: Loading,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserHasPermission',
});
