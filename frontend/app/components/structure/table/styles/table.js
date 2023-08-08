import styled, { css } from 'styled-components';

import { Colors } from 'components/utils/styles/ui';

export const Tr = styled.tr`
  border-bottom: 1px solid rgba(237, 237, 237);
  &:last-child {
    border-bottom: none;
  }
`;

export const Td = styled.td`
  padding: 1.6rem 0.5rem;
  text-align: left;
  vertical-align: top;

  &:first-child {
    padding-left: 2rem;
  }
  &:last-child {
    padding-right: 2rem;
  }

  ${({ noPadding }) => (noPadding ? noPaddingMixin : null)};
  ${({ noWrap }) => (noWrap ? noWrapMixin : null)};
  ${({ rightAligned }) => (rightAligned ? rightAlignedMixin : null)};
  ${({ centered }) => (centered ? centeredMixin : null)};
`;

export const Th = styled(Td.withComponent('th'))`
  font-weight: 400;
`;

const borderedMixin = css`
  ${Tr} + ${Tr} {
    ${Td},
    ${Th} {
      border-top: 2px solid #eaeaea;
    }
  }
`;

const noPaddingMixin = css`
  padding-top: 0;
  padding-bottom: 0;
  vertical-align: middle;
`;

const noWrapMixin = css`
  white-space: nowrap;
`;

const rightAlignedMixin = css`
  text-align: right;
`;

const centeredMixin = css`
  text-align: center;
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  border-radius: 6px;
  background-color: ${Colors.white};
  color: ${Colors.text};
  margin-bottom: 1rem;

  ${({ isBordered }) => (isBordered ? borderedMixin : null)};
`;

export const Thead = styled.thead`
  ${Td}, ${Th} {
    padding-top: 1.4rem;
    padding-bottom: 1.4rem;
    color: ${Colors.white};
    background-color: ${({ theme }) => theme.colors.primary};

    &:first-child {
      border-top-left-radius: 6px;
    }
    &:last-child {
      border-top-right-radius: 6px;
    }
  }
`;

export const Tfoot = Thead.withComponent('tfoot');

export const Tbody = styled.tbody`
  ${Tr}: hover {
    background-color: ${Colors.tealLighter};
  }
`;
