import { LoadableRoute } from 'routes/utils/loadable';

export const SettingsContainer = LoadableRoute({
  loader: () => import(/* webpackChunkName: "Settings" */ './Settings'),
});
