import { get } from 'lodash';

export const sidebarWidth = 5.4;
export const sidebarSubMenuWidth = 23;
export const contextHeaderHeight = sidebarWidth;
export const adminNagHeight = 3.4;
export const tableMenuHeight = 6.4;
export const tableTabsHeight = 3.4;
export const tableSearchHeight = 6.9;

export const occupiedHeight = (params) => {
  const withToolbar = get(params, 'withToolbar', true);
  const withContext = get(params, 'withContext', true);
  const withTableMenu = get(params, 'withTableMenu', false);
  const withTableTabs = get(params, 'withTableTabs', false);
  const withTableSearch = get(params, 'withTableSearch', false);

  const isAdminLogged = localStorage.getItem('adminMembershipId');

  return (
    (withContext ? contextHeaderHeight : 0) +
    (withToolbar ? sidebarWidth : 0) +
    (withTableMenu ? tableMenuHeight : 0) +
    (withTableTabs ? tableTabsHeight : 0) +
    (withTableSearch ? tableSearchHeight : 0) +
    (isAdminLogged ? adminNagHeight : 0)
  );
};
