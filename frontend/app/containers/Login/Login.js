import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import qs from 'qs';
import { isObject } from 'lodash';

import { injectReducer } from 'utils/injectReducer';
import { openFlashMessage } from 'components/utils/flashMessages';
import { Loading } from 'components/feedback/loading/loading';
import { authSelector } from 'containers/App/selectors';
import { loginReducer as reducer } from 'containers/Login/reducer';

import { loginSelector } from './selectors';
import { signIn, tokenSession } from './actions';
import { FlashDefinition } from './utils/flashDefinition';
import i18n from './utils/i18n';
import { LoginScene } from './scenes/Login';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const redirectRoute = location.query.redirect || '/';

    this.state = {
      modal: null,
      modalMessage: null,
      redirectTo: redirectRoute,
    };
  }

  UNSAFE_componentWillMount() {
    const {
      auth,
      location: { query, pathname },
    } = this.props;

    const cleanSession = !auth.isFetching && !auth.authenticated;

    if (query.redirect && query.redirect !== '/') {
      if (cleanSession) {
        openFlashMessage(FlashDefinition.LogInFirst);
      }
    } else {
      this.onRedirect(auth);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      auth,
      location: { query },
    } = nextProps;

    this.onRedirect(auth);
  }

  onRedirect(auth) {
    const {
      handleRedirect,
      location: { query },
    } = this.props;
    const { redirectTo } = this.state;

    if (auth.authenticated) {
      handleRedirect(redirectTo);
    }
  }

  handleLogin = (data) => {
    const { handleLogin } = this.props;

    handleLogin(data);
  };

  renderScene() {
    const { location, login, handleRedirect } = this.props;
    const { modal } = this.state;

    return (
      <LoginScene
        saveForm={this.handleLogin}
        onRedirect={handleRedirect}
        modal={modal}
        onCloseModal={this.closeModal}
      />
    );
  }

  render() {
    const { intl, auth, login } = this.props;

    if (auth.isFetching || (!auth.isFetching && auth.authenticated)) {
      return <Loading />;
    }

    return (
      <>
        <Helmet title={intl.formatMessage(i18n.login)} />
        {this.renderScene()}
      </>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleRedirect: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  auth: authSelector,
  login: loginSelector,
});

function mapDispatchToProps(dispatch) {
  return {
    handleLogin: (params) => dispatch(signIn(params)),
    handleRedirect: (path) => dispatch(push(path)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'login', reducer });
const withIntl = injectIntl;

export default compose(withReducer, withConnect, withIntl)(Login);
