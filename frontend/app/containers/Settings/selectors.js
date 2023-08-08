import { createSelector } from 'reselect';

const rootSelector = createSelector(
  (state) => state.get('Settings'),
  (substate) => substate
);

export { rootSelector };
