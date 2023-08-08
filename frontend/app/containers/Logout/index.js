import { LoadableRoute } from 'routes/utils/loadable';

export const LogoutContainer = LoadableRoute({
  loader: () => import(/* webpackChunkName: "Logout" */ './Logout'),
});
