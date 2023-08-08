import styled, { css } from 'styled-components';
import { SmartLink } from 'components/navigation/SmartLink';

import { Colors } from 'components/utils/styles/ui';
import { Icon as IconBase } from 'components/elements/icon';

const linkMixin = css`
  display: inline-block;
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  border-radius: 0.6rem;
  margin-left: 0.5rem;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: ${Colors.textLighter};
  ${({ theme }) => theme.typography.text.medium};
`;

export const Pages = styled.div`
  display: flex;
  align-items: center;
  & > *:first-child {
    margin-left: 0;
  }
`;

export const Total = styled.div`
  line-height: 3rem;
  text-transform: lowercase;
`;

export const Dots = styled.span`
  font-size: 2rem;
  letter-spacing: 0.4rem;
  margin-left: 0.5rem;
`;

export const Links = styled.span``;

export const Icon = styled(IconBase)`
  ${linkMixin};

  background-color: ${({ theme }) => theme.colors.primary};
  &,
  path {
    margin: 0;
    fill: ${Colors.white};
  }
`;

export const Link = styled(SmartLink)`
  ${linkMixin};

  color: ${({ 'data-active': active, theme }) =>
    active ? theme.colors.primary : 'inherit'};
  background-color: ${Colors.white};
  text-align: center;
  line-height: 3rem;
  font-weight: 400;
`;
