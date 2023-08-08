import { createSelector } from 'reselect';
import { get } from 'lodash';

const rootSelector = createSelector(
  (state) => state.get('appReducers'),
  (substate) => substate
);

const authSelector = createSelector(rootSelector, (substate) =>
  get(substate, 'auth')
);

const membershipRoleSelector = createSelector(rootSelector, (substate) =>
  get(substate, 'auth.membershipRole')
);

const isAuthenticatedSelector = createSelector(rootSelector, (substate) =>
  get(substate, 'auth.authenticated')
);

const sessionSelector = createSelector(rootSelector, (substate) =>
  get(substate, 'session')
);

const userSelector = createSelector(rootSelector, (substate) =>
  get(substate, 'session.user.model')
);

const userChannelSelector = createSelector(rootSelector, (substate) =>
  get(substate, 'session.user.channel')
);

const companySelector = createSelector(rootSelector, (substate) =>
  get(substate, 'session.company.model')
);

const socketSelector = createSelector(rootSelector, (substate) =>
  get(substate, 'session.socket')
);

const companyChannelSelector = createSelector(rootSelector, (substate) =>
  get(substate, 'session.company.channel')
);

const uiSelector = createSelector(rootSelector, (substate) =>
  get(substate, 'ui').toJS()
);

export {
  authSelector,
  sessionSelector,
  uiSelector,
  membershipRoleSelector,
  userSelector,
  userChannelSelector,
  companySelector,
  socketSelector,
  companyChannelSelector,
  isAuthenticatedSelector,
};
