import { LoadableRoute } from 'routes/utils/loadable';

export const MembersContainer = LoadableRoute({
  loader: () => import(/* webpackChunkName: "Settings/Members" */ './index'),
});
