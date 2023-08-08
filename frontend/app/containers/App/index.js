/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import PropTypes from 'prop-types';

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { isEmpty, get } from 'lodash';
import moment from 'moment';

import { LoadingBar } from 'components/feedback/LoadingBar';
import { Sidebar } from 'containers/Sidebar';

import { Actions } from 'containers/App/actions/sessions';
import { closeModal } from 'containers/App/actions/ui';

import { Loading } from 'components/feedback/loading/loading';
import { Modal } from 'components/overlay/Modal';
import {
  AppContainer,
  AppBody,
} from 'components/structure/page/styles/containers';
import { settingsReducer } from 'containers/Settings/reducer';

import { injectSaga } from 'utils/injectSaga';
import { injectReducer } from 'utils/injectReducer';
import { SidebarProvider } from 'components/structure/SidebarContext';

import { rootSaga as saga } from './sagas';
import { Config } from './config';
import {
  uiSelector,
  userSelector,
  companySelector,
  isAuthenticatedSelector,
  userChannelSelector,
} from './selectors';
import {
  isUnauthorizedPath,
  isLoggingOut,
  isLoggingInToken,
} from './utils/helpers';
import { sessionExpired, handleSessionExpired } from './utils/expirationTimer';
import * as styled from './scenes/styles';

class AppComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.appContainer = React.createRef();
    this.state = {
      sidebarExpanded: false,
    };
  }

  UNSAFE_componentWillMount() {
    const token = localStorage.getItem('phoenixAuthToken');
    const { dispatch, location } = this.props;

    if (token && !isLoggingOut(location)) {
      if (sessionExpired()) {
        if (!isLoggingInToken(location)) {
          handleSessionExpired(dispatch);
        }
      } else {
        dispatch(Actions.currentSession());
      }
    }
  }

  componentDidMount() {
    this.handleRedirects();
  }

  componentDidUpdate(prevProps) {
    const {
      dispatch,
      history,
      channel,
      company,
      user,
      isAuthenticated,
    } = this.props;

    this.handleRedirects();
  }

  handleRedirects() {
    const { user, company, location, handleRedirect } = this.props;

    if (isLoggingOut(location)) {
      return;
    }
  }

  toggleSidebar = (value) => this.setState({ sidebarExpanded: value });

  renderModals() {
    const { ui, dispatch } = this.props;

    if (isEmpty(ui.modals)) {
      return null;
    }

    const modals = ui.modals.map((item) => (
      <Modal
        item={item}
        key={`modal-${item.type}`}
        onClose={(modal) => dispatch(closeModal(modal))}
      />
    ));
    return <div>{modals}</div>;
  }

  renderPageLoading() {
    const { ui } = this.props;
    if (ui.pageLoading) {
      return <Loading />;
    }
    return null;
  }

  renderSidebar() {
    const { history } = this.props;
    const { sidebarExpanded } = this.state;
    return (
      <Sidebar
        history={history}
        sidebarExpanded={sidebarExpanded}
        toggleSidebar={this.toggleSidebar}
      />
    );
  }

  render() {
    const { ui, location, isAuthenticated, route } = this.props;
    const { sidebarExpanded } = this.state;
    const hasSidebar = isAuthenticated;

    return (
      <SidebarProvider value={{ expanded: sidebarExpanded }}>
        <LoadingBar />
        <AppContainer ref={this.appContainer}>
          {hasSidebar && this.renderSidebar()}
          <AppBody
            hasSidebar={hasSidebar}
            hasSubMenu={hasSidebar}
            sidebarExpanded={sidebarExpanded}
          >
            {renderRoutes(route.routes)}
          </AppBody>
        </AppContainer>
        <styled.FlashMessage
          position="bottom-left"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        {this.renderModals()}
        {this.renderPageLoading()}
      </SidebarProvider>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  ui: uiSelector,
  user: userSelector,
  company: companySelector,
  isAuthenticated: isAuthenticatedSelector,
  channel: userChannelSelector,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  handleUpdateUser: (params) => dispatch(Actions.updateUserSettings(params)),
  handleRedirect: (path) => dispatch(push(path)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: '/', saga });
const withSettingsReducer = injectReducer({
  key: 'Settings',
  reducer: settingsReducer,
});

AppComponent.propTypes = {
  route: PropTypes.object,
  ui: PropTypes.object,
  user: PropTypes.object,
  company: PropTypes.object,
  channel: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  dispatch: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  handleUpdateUser: PropTypes.func,
  handleRedirect: PropTypes.func,
};

export const App = compose(
  withSaga,
  withConnect,
  withSettingsReducer
)(AppComponent);
