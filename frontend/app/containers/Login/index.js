import { LoadableRoute } from 'routes/utils/loadable';

export const LoginContainer = LoadableRoute({
  loader: () => import(/* webpackChunkName: "Login" */ './Login'),
});
