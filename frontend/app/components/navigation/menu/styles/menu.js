import styled, { css } from 'styled-components';

import { Icon as IconBase } from 'components/elements/icon';
import { Colors } from '../../../utils/styles/ui';

export const withLinkPadding = css`
  & > a {
    ${({ linkPadding }) => (linkPadding === 'small' ? 'padding:1.6rem;' : '')};
  }
`;

export const Icon = styled(IconBase)`
  flex-shrink: 0;
  margin-left: 0.6rem;
`;

const withBorder = css`
  border-color: ${Colors.greyLighter};
  border-style: solid;
  border-width: 0;

  ${({ border }) => (border === 'left' ? 'border-left-width: 2px;' : '')};
`;

export const Menu = styled.ul`
  display: flex;
  align-items: stretch;
  flex-grow: 1;
  padding: 0;
  margin: 0;
`;

export const MenuVertical = styled(Menu)`
  display: block;

  & > div {
    border-radius: 0.6rem;
    overflow-x: hidden !important;

    & > div {
      margin-bottom: 0 !important;
      overflow-x: hidden !important;
    }
  }
`;

export const Item = styled.li`
  ${withLinkPadding}
  ${withBorder};
  display: inline-flex;
`;

export const VerticalBase = css`
  color: ${Colors.text};
  cursor: pointer;
  margin: 0;
  width: 100%;
`;

const linkWithNoPadding = ({ isVertical }) =>
  isVertical &&
  css`
    padding: 0 1.5rem;
    & > a {
      padding-left: 0;
      padding-right: 0;
    }
  `;

export const ItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${linkWithNoPadding}
`;

export const ItemVerticalbox = styled.li`
  ${VerticalBase}
  ${withLinkPadding}
  ${withBorder}

  &:first-child {
    border-top-left-radius: 0.6rem;
    border-top-right-radius: 0.6rem;
  }

  &:last-child {
    border-bottom-left-radius: 0.6rem;
    border-bottom-right-radius: 0.6rem;
  }

  background-color: ${({ className, theme }) => {
    if (className.includes('selected')) {
      return theme.colors.primary;
    }

    return Colors.white;
  }};

  &:hover {
    background-color: ${Colors.tealLightest};
  }

  ${ItemContent} > a {
    justify-content: flex-start;
  }
`;

export const ItemVertical = styled.li`
  ${VerticalBase}
  ${withLinkPadding}
  ${withBorder}
  border-radius: 0;
`;
