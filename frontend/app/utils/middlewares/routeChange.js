import { LOCATION_CHANGE } from 'react-router-redux';

import { resetProgress } from 'containers/App/actions/ui';

// Manually reset progressbar on route change
export const routeChange = ({ dispatch }) => (next) => (action) => {
  if (action.type && action.type === LOCATION_CHANGE) {
    dispatch(resetProgress());
  }
  return next(action);
};
