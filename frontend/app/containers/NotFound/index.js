import { LoadableRoute } from 'routes/utils/loadable';

export const NotFoundContainer = LoadableRoute({
  loader: () => import(/* webpackChunkName: "NotFound" */ './NotFound'),
});
