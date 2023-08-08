import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { injectIntl, intlShape } from 'react-intl';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { get, isNull } from 'lodash';

import { userSelector, membershipRoleSelector } from 'containers/App/selectors';
import { Loading } from 'components/feedback/loading/loading';

import { inviteMember } from './actions';
import { InviteMemberScene as Scene } from './scene';
import i18n from './scene/utils/i18n';

const InviteComponent = function Invite(props) {
  const {
    intl,
    user,
    membershipRole,
    handleInviteMember,
    handleCloseModal,
  } = props;

  return (
    <>
      <Helmet title={intl.formatMessage(i18n.inviteMember)} />
      <Scene
        saveForm={handleInviteMember}
        onCloseModal={handleCloseModal}
        currentUserEmail={get(user, 'email')}
        membershipRole={membershipRole}
      />
    </>
  );
};

InviteComponent.propTypes = {
  intl: intlShape,
  membershipRole: PropTypes.string,
  user: PropTypes.object,
  handleInviteMember: PropTypes.func,
  handleCloseModal: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: userSelector,
  membershipRole: membershipRoleSelector,
});

function mapDispatchToProps(dispatch) {
  return {
    handleInviteMember: (params) => dispatch(inviteMember(params)),
    handleCloseModal: () => dispatch(push('/settings/members')),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withIntl = injectIntl;

export const Invite = compose(withConnect, withIntl)(InviteComponent);
