import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { List as MembersContainer } from './List';
import { Invite as MembersInviteContainer } from './Invite';
import { Remove as MemberRemoveContainer } from './Remove';

const Members = function Members(props) {
  const {
    match: { url },
  } = props;

  return (
    <>
      <Route path={`${url}`} component={MembersContainer} />
      <Route path={`${url}/invite`} component={MembersInviteContainer} />
      <Route path={`${url}/:id/remove`} component={MemberRemoveContainer} />
    </>
  );
};

Members.propTypes = {
  match: PropTypes.object,
};

export default Members;
