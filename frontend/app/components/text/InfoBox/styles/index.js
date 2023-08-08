import styled, { css } from 'styled-components';

import { Colors, tableColors } from 'components/utils/styles/ui';
import { Icon as IconBase } from 'components/elements/icon';

export const IconWrapper = styled.div`
  width: 2rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
  color: ${({ color }) => Colors[color]};
`;

export const Icon = styled(IconBase)`
  margin-right: 1rem;
`;

export const Content = styled.div`
  padding-left: 1rem;
  color: ${Colors.text};
  line-height: 2.1rem;
`;

const compactMixin = css`
  padding: ${({ noPadding }) => (noPadding ? 0 : '1rem 0.8rem')};

  ${IconWrapper} {
    width: 1.6rem;
  }

  ${Icon} {
    width: 1.6rem;
    height: 1.6rem;
  }

  ${Content} {
    margin-top: 0;
    font-size: 1.3rem;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  padding: ${({ noPadding }) =>
    noPadding ? 0 : '1.4rem 1.4rem 1.2rem 1.4rem'};
  border: 0.1rem solid;
  border-color: ${({ borderColor }) =>
    borderColor ? Colors[borderColor] : Colors.greyLight};
  border-radius: 0.3rem;
  background-color: ${({ backgroundColor }) =>
    backgroundColor
      ? Colors[backgroundColor]
      : tableColors.overlayBackgroundColor};

  ${({ size }) => size === 'compact' && compactMixin}
`;
