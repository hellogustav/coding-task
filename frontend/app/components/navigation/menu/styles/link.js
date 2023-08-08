import styled, { css } from 'styled-components';
import { SmartLink } from 'components/navigation/SmartLink';
import { iconElementsSelector } from 'components/elements/styles/icon';

import { Colors } from '../../../utils/styles/ui';

const boxShadow = css`
  box-shadow: ${({ className, theme }) =>
    className.includes('active')
      ? `0 -2px 0 0 ${theme.colors.primaryDark} inset`
      : 0};
`;

const disabledMixin = css`
  &,
  &:hover {
    cursor: default;
    color: ${Colors.textLighter};
  }

  ${iconElementsSelector} {
    stroke: ${Colors.textLighter} !important;
  }
`;

export const Tag = styled.span`
  padding: 0.4rem 0.8rem 0.1rem 0.8rem;
  border-radius: 0.6rem;
  background-color: ${({ theme, color }) =>
    color ? Colors[color] : theme.colors.primaryDark};
  color: ${Colors.white};
  text-transform: uppercase;
`;

const tagInvertedColor = ({ theme, isActive, color }) => {
  if (isActive) {
    return color ? Colors[color] : theme.colors.primaryDark;
  }
  return Colors.text;
};

export const TagInverted = styled.span`
  padding: 0.4rem 1rem;
  border-radius: 1.2rem;
  border: 1px solid ${tagInvertedColor};
  color: ${tagInvertedColor};
  font-size: 1.2rem;
  font-weight: 400;
  margin-left: 1rem;
`;

export const TagCompact = styled.span`
  padding: 0.4rem 1rem;
  border-radius: 1.2rem;
  color: ${({ fontColor }) => (fontColor ? Colors[fontColor] : Colors.text)};
  background-color: ${({ color }) => (color ? Colors[color] : Colors.labelBg)};
  font-size: 1.2rem;
  font-weight: 400;
  margin-left: 1rem;
`;

export const MainLink = styled(SmartLink)`
  align-items: center;
  text-align: center;
  color: ${({ className, theme }) => {
    if (className.includes('active')) {
      return theme.colors.primaryDark;
    }

    if (className.includes('selected')) {
      return Colors.white;
    }

    return Colors.text;
  }};
  cursor: pointer;
  display: inline-flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  line-height: 1;
  transition: color 100ms ease;

  ${iconElementsSelector} {
    stroke: ${({ className, theme }) =>
      className.includes('active') ? theme.colors.primaryDark : Colors.text};
  }

  ${({ disabled }) => disabled && disabledMixin};
`;

export const ContextLink = styled(MainLink)`
  flex-direction: row;
  ${boxShadow}

  ${Tag} {
    margin-left: 0.6rem;
  }

  ${({ disabled }) => disabled && disabledMixin}
`;

export const SimpleLink = styled(MainLink)`
  ${boxShadow}
  padding: 1.6rem 2.4rem;
  ${({ isSmall, theme }) =>
    isSmall ? theme.typography.link.small : theme.typography.link.medium};
  ${({ disabled }) => disabled && disabledMixin}
`;

export const VerticalLink = styled(MainLink)`
  ${boxShadow}
  width: 100%;
  cursor: pointer;

  ${Tag} {
    margin-left: 1rem;
  }

  ${({ disabled }) => disabled && disabledMixin}
`;

export const VerticalboxLink = styled(VerticalLink)`
  box-shadow: none;
  text-align: left;

  ${({ disabled }) => disabled && disabledMixin}
`;

export const MainIcon = styled.span`
  margin-right: 1.4rem;
`;

export const ContextIcon = styled.span`
  align-items: center;
  display: flex;
  margin-right: 1rem;
`;

export const VerticalIcon = styled.a``;

export const VerticalboxIcon = styled.span`
  margin-right: 0.8rem;
  display: flex;
  align-items: center;
  & > * {
    flex-shrink: 0;
  }
`;

export const SimpleIcon = styled.span`
  margin-top: -.2rem;
  margin-${({ position }) => (position === 'right' ? 'left' : 'right')}: .2rem;
`;

export const LinkItem = styled.span`
  max-width: 100%;
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'normal')};
  white-space: nowrap;
`;
