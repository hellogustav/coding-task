import React from 'react';
import { Redirect } from 'react-router-dom';

// App skeleton
import { App } from 'containers/App';

// Shared private routes
import { SettingsContainer } from 'containers/Settings';

// Shared public routes
import { LoginContainer } from 'containers/Login';
import { LogoutContainer } from 'containers/Logout';
import { NotFoundContainer } from 'containers/NotFound';

const rootRoute = [
  {
    path: '/',
    component: () => <Redirect to="/settings" />,
    exact: true,
  },
];

const settingsRoutes = [
  {
    path: '/settings',
    component: SettingsContainer,
  },
];

const accountRoutes = [
  {
    path: '/login/:token?',
    component: LoginContainer,
  },
  {
    path: '/logout',
    component: LogoutContainer,
  },
];

const notFoundRoute = [
  {
    component: NotFoundContainer,
  },
];

export const Routes = [
  {
    component: App,
    routes: [
      ...rootRoute,
      ...accountRoutes,
      ...settingsRoutes,
      ...notFoundRoute,
      // NotFound must be very last route
      // which should only render, if there is no other match
    ],
  },
];
