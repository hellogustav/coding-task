import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { find, reject } from 'lodash';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Loading } from 'components/feedback/loading/loading';
import { companySelector } from 'containers/App/selectors';

import { RemoveMemberScene as Scene } from './scene';
import i18n from './scene/utils/i18n';

import { removeMember, fetchAllMembers } from './actions';

class RemoveComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { members: [] };
  }

  componentDidMount() {
    this.fetchMembers();
  }

  fetchMembers = () => {
    const { onFetchMembers } = this.props;

    onFetchMembers().then(({ data }) => {
      this.setState({
        members: data,
      });
    });
  };

  render() {
    const {
      match: {
        params: { id },
      },
      intl,
      company,
      handleRemoveMember,
      handleCloseModal,
    } = this.props;
    const { members } = this.state;
    const member = find(members, { id });

    if (!member) {
      return <Loading />;
    }

    const membersToAssign = reject(members, { id: member.id });

    return (
      <>
        <Helmet title={intl.formatMessage(i18n.removeMember)} />
        <Scene
          member={member}
          members={membersToAssign}
          company={company}
          onRemoveMember={handleRemoveMember}
          onCloseModal={handleCloseModal}
        />
      </>
    );
  }
}

RemoveComponent.propTypes = {
  intl: intlShape,
  match: PropTypes.object,
  company: PropTypes.object,
  handleRemoveMember: PropTypes.func,
  handleCloseModal: PropTypes.func,
  onFetchMembers: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  company: companySelector,
});

function mapDispatchToProps(dispatch) {
  return {
    handleRemoveMember: (id, params) => dispatch(removeMember(id, params)),
    handleCloseModal: () => dispatch(push('/settings/members')),
    onFetchMembers: () => dispatch(fetchAllMembers()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withIntl = injectIntl;

export const Remove = compose(
  withIntl,
  withConnect,
  withRouter
)(RemoveComponent);
