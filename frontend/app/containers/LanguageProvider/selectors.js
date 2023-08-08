import { createSelector } from 'reselect';

const rootSelector = createSelector(
  (state) => state.get('language'),
  (substate) => substate.toJS()
);

const localeSelector = createSelector(
  rootSelector,
  (substate) => substate.locale
);

export { localeSelector };
