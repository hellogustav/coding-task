import { createSelector } from 'reselect';
import { rootSelector } from '../selectors';

const membersSelector = createSelector(
  rootSelector,
  (substate) => substate.members.members
);

const paginateSelector = createSelector(
  rootSelector,
  (substate) => substate.members.paginate
);

export { membersSelector, paginateSelector };
