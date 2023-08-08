import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';

import { userRole } from 'utils/authorization/utils/auth';
import { userHasPermission, userIsAuthenticated } from 'utils/authWrapper';
import { injectReducer } from 'utils/injectReducer';

import { companySelector } from 'containers/App/selectors';
import { SubMenu } from 'containers/Sidebar/subMenu';
import { settingsReducer as reducer } from 'containers/Settings/reducer';
import { Icon } from 'components/elements/icon';
import { SidebarProvider } from 'components/structure/SidebarContext';

import i18n from './utils/i18n';
import * as styled from './styles';
import { subMenu } from './utils/subMenu';

import { MembersContainer } from './Members/Loadable';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarExpanded: false,
    };
  }

  toggleSidebar = (value) => this.setState({ sidebarExpanded: value });

  render() {
    const {
      history,
      match: { url },
      intl,
      company,
    } = this.props;
    const { sidebarExpanded } = this.state;
    const role = userRole();

    if (!company) {
      return null;
    }

    const isNotMember = role !== 'member';
    return (
      <styled.PageWrapper>
        <Helmet title={intl.formatMessage(i18n.settings)} />
        <styled.Sidebar>
          <SubMenu
            context={subMenu(role, company)}
            expanded={sidebarExpanded}
            toggleSidebar={this.toggleSidebar}
            history={history}
            referrer="/settings"
          />
          {!sidebarExpanded && (
            <styled.Expander
              data-manual="sub_menu.open_arrow"
              onClick={() => this.toggleSidebar(true)}
            >
              <Icon icon="CaretRight" size="small" color="white" />
            </styled.Expander>
          )}
        </styled.Sidebar>
        <styled.Body sidebarExpanded={sidebarExpanded}>
          <SidebarProvider value={{ expanded: sidebarExpanded }}>
            <Switch>
              {isNotMember && [
                <Route
                  key="set-members"
                  path={`${url}/members`}
                  component={MembersContainer}
                />,
              ]}
              <Redirect to={`${url}/members`} />
            </Switch>
          </SidebarProvider>
        </styled.Body>
      </styled.PageWrapper>
    );
  }
}

Settings.propTypes = {
  intl: intlShape,
  history: PropTypes.object,
  match: PropTypes.object,
  company: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  company: companySelector,
});

const withReducer = injectReducer({ key: 'Settings', reducer });
const withConnect = connect(mapStateToProps, null);
const withAuthentication = userIsAuthenticated;
const withPermission = userHasPermission;
const withIntl = injectIntl;

export default compose(
  withReducer,
  withConnect,
  withIntl,
  withAuthentication,
  withPermission
)(Settings);
