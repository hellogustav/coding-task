import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import { get } from 'lodash';

import { Loading } from 'components/feedback/loading/loading';
import { authSelector, socketSelector } from 'containers/App/selectors';
import { isValidLink, withProtocol } from 'components/utils/url';
import { userEmail } from 'utils/authorization/utils/auth';

import { signOut } from './actions';

export class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.handleLogout();
  }

  componentDidUpdate(prevProps) {
    const { auth } = this.props;

    if (!auth.isFetching && prevProps.auth.isFetching) {
      this.handleLogout();
    }
  }

  handleLogout() {
    const {
      location: { query },
      auth,
      socket,
      handleSignOut,
      handleRedirect,
    } = this.props;
    const email = userEmail();
    const callback = () => {
      if (isValidLink(query.redirect)) {
        window.location.href = withProtocol(query.redirect);
      } else {
        handleRedirect(query.redirect || '/login');
      }
    };

    if (auth.isFetching) {
      return;
    }

    if (auth.authenticated || localStorage.getItem('phoenixAuthToken')) {
      handleSignOut({ ...query }, socket)
        .then((response) => {
          callback();
        })
        .catch(callback);
    } else {
      handleRedirect(query.redirect || '/login');
    }
  }

  render() {
    const { location } = this.props;

    return (
      <div>
        <Loading />
      </div>
    );
  }
}

Logout.propTypes = {
  location: PropTypes.object,
  auth: PropTypes.object,
  socket: PropTypes.object,
  handleRedirect: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  auth: authSelector,
  socket: socketSelector,
});

function mapDispatchToProps(dispatch) {
  return {
    handleRedirect: (path) => dispatch(push(path)),
    handleSignOut: (params, socket) => dispatch(signOut(params, socket)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
