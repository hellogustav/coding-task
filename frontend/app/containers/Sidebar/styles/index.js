import React from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

import { Link, NavLink } from 'react-router-dom';

import { Avatar as AvatarBase } from 'components/visual/avatar/avatar';
import {
  sidebarWidth,
  sidebarSubMenuWidth,
} from 'components/structure/page/utils/calculations';
import { Colors } from 'components/utils/styles/ui';
import { scale15x } from 'components/utils/styles/animations';
import { Icon } from 'components/elements/icon';
import { iconElementsSelector } from 'components/elements/styles/icon';

export const Sidebar = styled.div`
  position: fixed;
  display: flex;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 2000;
  pointer-events: none;
`;

export const MainMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: ${sidebarWidth}rem;
  background-color: ${Colors.tealDarker};
  z-index: 502;
  pointer-events: auto;
`;

export const Header = styled.div`
  display: flex;
  width: ${sidebarWidth}rem;
  height: ${sidebarWidth}rem;
  background-color: ${({ isAdmin, theme }) =>
    isAdmin ? Colors.text : theme.colors.primary};
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 1.5rem;
  color: white;
  font-size: 2rem;
  font-weight: 500;
  line-height: 1;

  svg {
    max-width: 100%;

    path {
      fill: white;
    }
  }
`;

export const Body = styled.div`
  flex-shrink: 1;
  flex-grow: 1;
`;

export const Footer = styled.div`
  flex-shrink: 1;
  flex-grow: 0;
`;

export const Menu = styled.nav``;

export const MenuLabel = styled.div`
  position: absolute;
  left: 100%;
  top: 50%;
  margin-left: 12px;
  padding: 0.5rem;
  transform: translateY(-50%);
  background-color: ${Colors.tealDarker};
  box-shadow: 0 4px 8px 0 ${Colors.blackMoreTransparent};
  color: white;
  white-space: nowrap;
  display: none;

  &:before {
    position: absolute;
    top: 50%;
    left: 0;
    margin-left: -6px;
    margin-top: -5px;
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 6px 5px 0;
    border-color: transparent ${Colors.tealDarker} transparent transparent;
  }
`;

export const MenuItem = styled(
  styled.div``.withComponent(({ to, ...rest }) =>
    to ? <NavLink to={to} {...rest} /> : <div {...rest} />
  )
)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0.8rem;
  min-height: ${sidebarWidth}rem;
  box-shadow: inset 0 -1px 0 ${Colors.whiteMoreTransparent};
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${darken(0.05, Colors.tealDarker)};

    ${MenuLabel} {
      display: block;
    }
  }

  &.active {
    background-color: white;
    box-shadow: inset 3px 0 0 ${({ theme }) => theme.colors.primary};

    &:after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 1px;
      background-color: ${Colors.greyLight};
      content: '';
    }
  }
`;

export const NewsItem = styled(MenuItem)`
  box-shadow: none;
`;

export const MenuTitleIcon = styled(Icon).attrs(({ isActive }) => ({
  color: isActive ? Colors.tealDark : Colors.white,
}))``;

export const MenuNewsTitleIcon = styled(MenuTitleIcon)`
  transform: rotateY(180deg);
`;

export const Avatar = styled(AvatarBase)`
  margin-bottom: 1.5rem;
`;

const PopoverArrow = css`
  &:before,
  &:after {
    right: 100%;
    top: 90%;
    border: 1px solid transparent;
    content: '';
    position: absolute;
    display: block;
  }

  &:before {
    border-right-color: ${Colors.grey};
    border-width: 7px;
    margin-top: 6px;
  }

  &:after {
    border-right-color: ${Colors.white};
    border-width: 6px;
    margin-top: 7px;
  }
`;

export const Popover = styled.div`
  background-color: ${Colors.white};
  border: 1px solid ${Colors.grey};
  border-radius: 0.6rem;
  box-shadow: 0px 2px 4px 0 ${Colors.blackMoreTransparent};
  position: absolute;
  bottom: 0.8rem;
  left: ${sidebarWidth}rem;
  margin: 1rem;

  ${PopoverArrow}
`;

export const PopoverLink = styled(
  styled.div``.withComponent(({ to, ...rest }) =>
    to ? <NavLink to={to} {...rest} /> : <div {...rest} />
  )
)`
  display: flex;
  min-height: 3.75rem;
  padding: 0 1.25rem;
  color: ${Colors.text};
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: ${Colors.tealDark};

    ${iconElementsSelector} {
      stroke: ${Colors.tealDark};
    }
  }
`;

export const PopoverIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  flex-shrink: 1;
  padding: 0.75rem;
`;

export const PopoverLinkLabel = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0.75rem;
  font-weight: 500;
`;

export const sidebarMenuSeparator = styled.div`
  width: 100%;
  height: 0.1rem;
  margin-bottom: 0.5rem;
  background-color: ${Colors.grey};
`;

export const TrialDaysLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const UserProfileLink = styled(Link)`
  display: flex;
  align-items: center;
  width: 24rem;
  height: 5rem;
  padding: 0 1.8rem;
  cursor: pointer;
  user-select: none;
  border-bottom: 0.1rem solid ${Colors.grey};
  margin-bottom: 0.5rem;

  &:hover {
    background-color: ${Colors.tealLighter};
  }
`;

export const ProfileAvatar = styled(AvatarBase)``;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.8rem;
  width: 16.5rem;
  font-weight: 500;

  & > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:first-child {
      color: ${Colors.tealDark};
      font-weight: 600;
    }
    &:last-child {
      ${({ theme }) => theme.typography.text.small};
      color: ${Colors.textLighter};
    }
  }
`;

export const Expander = styled.div`
  position: absolute;
  width: 1.2rem;
  height: 10rem;
  top: calc(50% - 5rem);
  border-radius: 0 1.2rem 1.2rem 0;
  background-color: ${Colors.tealDark};
  cursor: pointer;
  z-index: 498;

  left: ${({ expanded }) =>
    expanded ? sidebarWidth + sidebarSubMenuWidth - 1.2 : sidebarWidth}rem;
  transition: left 0.3s ease-in-out;

  & > svg {
    margin-top: 4.3rem;
    margin-left: ${({ expanded }) => (expanded ? '-0.1rem' : '-0.2rem')};
  }
  pointer-events: auto;
`;

export const animateCounterMixin = css`
  transition: all 2s ease-in-out;
  animation: ${scale15x} 1000ms linear 0ms 1;
`;

export const CounterBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 0.8rem;
  height: 1.5rem;
  width: 1.5rem;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  background-color: ${Colors.red};
  color: ${Colors.white};
  font-size: 1.1rem;
  font-weight: 500;

  animation: none;
  ${({ animate }) => animate && animateCounterMixin}
`;
