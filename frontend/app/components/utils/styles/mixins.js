import { css } from 'styled-components';

import { iconElementsSelector } from 'components/elements/styles/icon';

import { Colors } from './ui';

export const menuActiveItemIcon = ({ skipIcon, active }) =>
  !skipIcon &&
  active &&
  css`
    ${iconElementsSelector} {
      stroke: ${Colors.tealDark};
    }
  `;

export const menuActiveText = ({ active }) =>
  active &&
  css`
    font-weight: 500;
    color: ${Colors.tealDark};
  `;

export const menuItemMixin = () =>
  css`
    ${menuActiveText}
    ${menuActiveItemIcon}

    &:hover {
      background-color: ${Colors.tealLightest};
    }
  `;
