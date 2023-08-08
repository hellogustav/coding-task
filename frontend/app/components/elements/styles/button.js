import React from 'react';
import styled, { css } from 'styled-components';
import { darken, parseToRgb, rgba } from 'polished';
import { assign, omit } from 'lodash';

import { SmartLink } from 'components/navigation/SmartLink';
import { iconElementsSelector } from 'components/elements/styles/icon';
import { rotate360 } from 'components/utils/styles/animations';
import {
  BUTTON_COLORS,
  BUTTON_HEIGHTS,
  BUTTON_FONT_SIZES,
} from 'components/elements/constants/buttons';
import { ICON_SIZES } from 'components/elements/constants/icons';
import { Colors } from 'components/utils/styles/ui';

const hasIconLeftMixin = css`
  &:first-child {
    margin-right: 0.5rem;
  }
`;
const hasIconRightMixin = css`
  &:last-child {
    margin-left: 0.5rem;
  }
`;

const propsToOmitForNativeHTMLElement = [
  'loading',
  'disabled',
  'hasIconLeft',
  'hasIconRight',
  'theme',
  'type',
  'color',
  'size',
  'rounded',
];

export const buttonSizeMixin = ({ size }) => css`
  height: ${BUTTON_HEIGHTS[size]};
  ${BUTTON_FONT_SIZES[size]};
`;

export const buttonColor = ({ theme, color }) =>
  theme.colors[color] || BUTTON_COLORS[color] || Colors[color];

const blankMixin = css`
  padding: 0;
  height: auto;
  background-color: transparent;
  border: none;
  line-height: inherit;
  color: ${buttonColor};
  white-space: normal;
  text-align: left;

  &:hover,
  &:focus {
    color: ${buttonColor};
    border-color: transparent;
    background-color: transparent;
    box-shadow: none;

    ${iconElementsSelector} {
      stroke: ${buttonColor};
    }
  }

  ${iconElementsSelector} {
    stroke: ${buttonColor};
  }
`;

const blankUnderlinedMixin = css`
  ${blankMixin}
  text-decoration: underline;
`;

const monoMixin = css`
  color: ${Colors.text};

  ${iconElementsSelector} {
    stroke: ${buttonColor};
  }
`;

const outlineMixin = css`
  background-color: transparent;
  border-color: ${buttonColor};
  color: ${buttonColor};

  &:hover,
  &:focus {
    color: white;
    background-color: ${buttonColor};

    ${iconElementsSelector} {
      stroke: ${Colors.white};
    }
  }

  ${iconElementsSelector} {
    stroke: ${buttonColor};
  }
`;

const invertedMixin = css`
  background-color: white;
  color: ${buttonColor};

  &:hover,
  &:focus {
    background-color: ${darken(0.025, 'white')};
  }

  ${iconElementsSelector} {
    stroke: ${buttonColor};
  }
`;

const disabledMixin = css`
  cursor: not-allowed !important;
  pointer-events: initial !important;

  &,
  &:hover,
  &:focus {
    box-shadow: none;
    color: ${Colors.textLighter};
    background-color: ${Colors.grey};
    border-color: ${Colors.grey};

    ${iconElementsSelector} {
      stroke: ${Colors.textLighter};
    }
  }
`;

const loadingMixin = css`
  color: transparent;
  pointer-events: none;

  &:hover,
  &:focus {
    color: transparent;
    box-shadow: none;
  }

  &:after {
    position: absolute;
    left: calc(50% - (1.6rem / 2));
    top: calc(50% - (1.6rem / 2));
    display: block;
    height: 1.6rem;
    width: 1.6rem;

    border: 2px solid white;
    border-radius: 0.8rem;
    border-right-color: ${buttonColor};
    border-top-color: ${buttonColor};

    content: '';

    animation: ${rotate360} 500ms infinite linear;
  }

  svg {
    visibility: hidden;
  }
`;

const buttonIconColor = ({ color }) => {
  switch (color) {
    case 'monoLighter':
      return Colors.text;
    case 'tealLighter':
      return Colors.text;
    default:
      return Colors.white;
  }
};

const buttonMixin = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: top;

  ${buttonSizeMixin};

  ${({ fullWidth }) => (fullWidth ? 'width: 100%;' : null)}

  padding-left: 0.75em;
  padding-right: 0.75em;

  background-color: ${buttonColor};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ color }) =>
    color === 'tealLighter' ? Colors.midGrayTransparent : Colors.transparent};
  border-radius: ${({ rounded }) => (rounded ? '99999px' : '3px')};
  color: ${({ color }) =>
    color === 'tealLighter' ? Colors.text : Colors.white};

  text-align: center;
  white-space: nowrap;

  appearance: none;
  user-select: none;
  cursor: pointer;

  transition: all 100ms ease;

  &:hover,
  &:focus {
    background-color: ${({ theme, color }) =>
      darken(0.025, buttonColor({ theme, color }))};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.35rem
      ${({ theme, color }) =>
        rgba(
          assign(parseToRgb(buttonColor({ theme, color })), { alpha: 0.25 })
        )};
    z-index: 1;
  }

  &:active {
    border-color: ${({ theme, color }) =>
      darken(0.05, buttonColor({ theme, color }))};
  }

  svg {
    width: ${({ size }) => ICON_SIZES[size]}rem;
    height: ${({ size }) => ICON_SIZES[size]}rem;
    ${({ hasIconLeft }) => (hasIconLeft ? hasIconLeftMixin : null)};
    ${({ hasIconRight }) => (hasIconRight ? hasIconRightMixin : null)};
  }

  ${iconElementsSelector} {
    stroke: ${buttonIconColor};
  }

  ${({ styleType }) => (styleType === 'outline' ? outlineMixin : null)};
  ${({ styleType }) => (styleType === 'inverted' ? invertedMixin : null)};
  ${({ styleType }) => (styleType === 'blank' ? blankMixin : null)};
  ${({ styleType }) =>
    styleType === 'blank-underlined' ? blankUnderlinedMixin : null};
  ${({ styleType }) => (styleType === 'mono' ? monoMixin : null)};
  ${({ disabled }) => (disabled ? disabledMixin : null)};
  ${({ isLoading }) => (isLoading ? loadingMixin : null)};
`;

export const Button = styled.button`
  ${buttonMixin};
`;

export const ButtonLink = styled(({ children, ...rest }) => (
  <SmartLink {...omit(rest, propsToOmitForNativeHTMLElement)}>
    {children}
  </SmartLink>
))`
  ${buttonMixin};
`;

export const ButtonSpacingWrapper = styled.div`
  display: block;
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const ButtonGroup = styled.div`
  white-space: nowrap;

  * + * {
    margin-left: 1rem;
  }
`;

export const ButtonRipple = styled.span`
  position: relative;
  display: block;
  background: ${Colors.whiteMoreTransparent};
  transform: scale(0);
  border-radius: 100%;

  &.animate {
    animation: ripple 0.65s linear;
  }
  @keyframes ripple {
    100% {
      opacity: 0;
      transform: scale(2.5);
    }
  }
`;
