import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import { ReactPageClick } from 'react-page-click';
import moment from 'moment';
import {
  isNil,
  isFunction,
  first,
  get,
  map,
  find,
  startsWith,
  isNumber,
} from 'lodash';

import theme from 'themes';

import { Icon } from 'components/elements/icon';

import {
  sidebarMenuProfile,
  buildSidebarMenu,
} from 'ui-definitions/main-menus';

import {
  socketSelector,
  companyChannelSelector,
  companySelector,
  userSelector,
} from 'containers/App/selectors';

import i18n from './i18n';
import * as styled from './styles';
import { SubMenu } from './subMenu';

const LogoComponent = theme.logoWhiteComponent;
const { platformName } = theme;

/* eslint no-unused-expressions:0 */
/* eslint react/no-did-update-set-state: 0 */
class SidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileMenuOpen: false,
    };
  }

  toggleProfileMenu = () =>
    this.setState((state) => ({ profileMenuOpen: !state.profileMenuOpen }));

  render() {
    const {
      history,
      user,
      company,
      sidebarExpanded,
      toggleSidebar,
      counters,
    } = this.props;

    if (!user || !company) {
      return false;
    }

    const { profileMenuOpen } = this.state;

    const {
      avatar,
      color,
      position,
      first_name: firstName,
      last_name: lastName,
    } = user;

    const initials = `${first(firstName)}${first(lastName)}`;

    if (!company) {
      return false;
    }

    const menu = buildSidebarMenu(company);

    const activeItem = find(
      menu,
      ({ isActive, path }) =>
        startsWith(window.location.pathname, path) ||
        (isFunction(isActive) && isActive(false, window.location))
    );

    return (
      <styled.Sidebar>
        <styled.MainMenu>
          <styled.Header>
            <styled.Logo to="/">
              {!isNil(LogoComponent) ? <LogoComponent /> : first(platformName)}
            </styled.Logo>
          </styled.Header>
          <styled.Body>
            <styled.Menu>
              {map(menu, ({ label, path, icon, isActive, slug, counter }) => (
                <styled.MenuItem
                  key={`menuitem-${slug}`}
                  to={path}
                  isActive={isActive}
                  data-manual={`menu.${slug}`}
                >
                  <styled.MenuTitleIcon
                    isActive={get(activeItem, 'slug') === slug}
                    icon={icon}
                    size="larger"
                  />
                  <styled.MenuLabel>{label}</styled.MenuLabel>
                </styled.MenuItem>
              ))}
            </styled.Menu>
          </styled.Body>
          <styled.Footer>
            <styled.Menu>
              <styled.NewsItem data-manual="menu.news">
                <styled.MenuNewsTitleIcon icon="Megaphone" size="large" />
                <styled.MenuLabel>
                  <FormattedMessage {...i18n.newsTooltip} />
                </styled.MenuLabel>
              </styled.NewsItem>
              <styled.MenuItem
                onClick={this.toggleProfileMenu}
                data-manual="header.account"
              >
                <styled.Avatar
                  size="small"
                  color={color}
                  context={{
                    initials,
                    picture: avatar,
                  }}
                />
              </styled.MenuItem>
            </styled.Menu>

            {profileMenuOpen && (
              <ReactPageClick notify={this.toggleProfileMenu}>
                <styled.Popover>
                  {company.company_type !== 'administrator' &&
                    company.company_type !== 'fuse_admin' && (
                      <styled.UserProfileLink
                        to="/user/profile"
                        onClick={this.toggleProfileMenu}
                      >
                        <styled.ProfileAvatar
                          size="smedium"
                          color={color}
                          activity
                          context={{
                            initials,
                            picture: avatar,
                          }}
                        />
                        <styled.UserInfo>
                          <span>
                            {firstName} {lastName}
                          </span>
                          <span>{position}</span>
                        </styled.UserInfo>
                      </styled.UserProfileLink>
                    )}

                  {map(sidebarMenuProfile(company), (item, i) => {
                    const { label, path, onAction, icon } = item;

                    return (
                      <>
                        <styled.PopoverLink
                          {...(path && { to: path })}
                          key={`item-${i}`}
                          onClick={() => {
                            this.toggleProfileMenu();
                            if (onAction) onAction();
                          }}
                        >
                          {icon && (
                            <styled.PopoverIcon>
                              <Icon icon={icon} size="large" />
                            </styled.PopoverIcon>
                          )}
                          <styled.PopoverLinkLabel>
                            {label}
                          </styled.PopoverLinkLabel>
                        </styled.PopoverLink>
                        {item.border === 'bottom' && (
                          <styled.sidebarMenuSeparator />
                        )}
                      </>
                    );
                  })}
                </styled.Popover>
              </ReactPageClick>
            )}
          </styled.Footer>
        </styled.MainMenu>
      </styled.Sidebar>
    );
  }
}

SidebarComponent.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
  company: PropTypes.object,
  sidebarExpanded: PropTypes.bool,
  toggleSidebar: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  socket: socketSelector,
  channel: companyChannelSelector,
  company: companySelector,
  user: userSelector,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const Sidebar = compose(withRouter, withConnect)(SidebarComponent);
