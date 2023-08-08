import qs from 'qs';
import { get, some } from 'lodash';

export const isLoginOrSignupPath = ({ pathname }) =>
  pathname.startsWith('/login') || pathname.startsWith('/signup');

export const isLoggingOut = ({ pathname }) => pathname.startsWith('/logout');

export const isLoggingInToken = ({ pathname, search }) =>
  pathname === '/login' &&
  search.match(/(magic_link_token|login_token|email_confirm_token)=/);

export const isWithSidebarPath = (location) => !isLoggingOut(location);
