import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import { get, isEmpty, noop } from 'lodash';

import { Loading } from 'components/feedback/loading/loading';
import { NoResults } from 'components/misc/NoResults';
import i18n from 'containers/Settings/utils/i18n';
import { userSelector, membershipRoleSelector } from 'containers/App/selectors';

import { fetchMembers, patchMember, resendInvite } from './actions';
import { MembersScene as Scene } from './scene';

import { membersSelector, paginateSelector } from '../selectors';

import { ContextHeader } from '../../ContextHeader';

class ListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  UNSAFE_componentWillMount() {
    const { onComponentMount } = this.props;

    onComponentMount();
  }

  handleReinviteMember = (id) => {
    const { handleReinviteMember } = this.props;

    handleReinviteMember(id).catch(noop);
  };

  render() {
    const {
      members,
      user,
      membershipRole,
      paginate,
      handleRedirect,
      handleUpdateMember,
      handlePageChange,
      intl,
    } = this.props;
    if (isEmpty(members) || isEmpty(paginate)) {
      return <NoResults />;
    }

    return (
      <>
        <Helmet title={intl.formatMessage(i18n.membersSettingsTitle)} />
        <ContextHeader tab="users" />
        <Scene
          currentUserId={get(user, 'id')}
          membershipRole={membershipRole}
          members={members}
          pagination={paginate}
          onInviteMember={() => handleRedirect('/settings/members/invite')}
          onUpdateMember={(id, role) => handleUpdateMember(id, { role })}
          onReinviteMember={(id) => this.handleReinviteMember(id)}
          onPageChange={handlePageChange}
        />
      </>
    );
  }
}

ListComponent.propTypes = {
  intl: intlShape,
  membershipRole: PropTypes.string,
  members: PropTypes.array,
  paginate: PropTypes.object,
  user: PropTypes.object,
  onComponentMount: PropTypes.func,
  handleUpdateMember: PropTypes.func,
  handleReinviteMember: PropTypes.func,
  handlePageChange: PropTypes.func,
  handleRedirect: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: userSelector,
  membershipRole: membershipRoleSelector,
  members: membersSelector,
  paginate: paginateSelector,
});

function mapDispatchToProps(dispatch, props) {
  return {
    onComponentMount: () =>
      dispatch(fetchMembers(get(props, 'location.query.page', 1))),
    handleUpdateMember: (id, role) => dispatch(patchMember(id, role)),
    handleReinviteMember: (id) => dispatch(resendInvite(id)),
    handlePageChange: (page) => dispatch(fetchMembers(page)),
    handleRedirect: (path) => dispatch(push(path)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withIntl = injectIntl;

export const List = compose(withIntl, withConnect)(ListComponent);
