import {
  showLoading,
  hideLoading,
  resetLoading,
} from 'react-redux-loading-bar';

import { Constants } from '../constants';

export {
  showLoading as showProgress,
  hideLoading as hideProgress,
  resetLoading as resetProgress,
};

export function openPageLoading() {
  return {
    type: Constants.OPEN_PAGE_LOADING,
  };
}
export function closePageLoading() {
  return {
    type: Constants.CLOSE_PAGE_LOADING,
  };
}

export function openModal(obj) {
  return {
    type: Constants.OPEN_MODAL,
    obj,
  };
}
export function closeModal(obj) {
  return {
    type: Constants.CLOSE_MODAL,
    obj,
  };
}

export function openSideModal(payload) {
  return {
    type: Constants.OPEN_SIDEMODAL,
    payload,
  };
}
export function closeSideModal(payload) {
  return {
    type: Constants.CLOSE_SIDEMODAL,
    payload,
  };
}
