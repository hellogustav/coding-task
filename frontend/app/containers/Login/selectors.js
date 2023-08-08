import { createSelector } from 'reselect';

const loginSelector = createSelector(
  (state) => state.get('login'),
  (substate) => substate
);

export { loginSelector };
