import styled, { css } from 'styled-components';

import { Colors } from 'components/utils/styles/ui';

const borderColor = ({ color, flash }) => {
  if (flash) {
    return Colors.yellow;
  }
  if (color === 'dark') {
    return Colors.tealDarker;
  }
  return Colors.greyLight;
};
const backgroundColor = ({ color, flash }) => {
  if (flash) {
    return Colors.yellowLight;
  }
  if (color === 'dark') {
    return Colors.tealDarker;
  }
  return Colors.white;
};

export const Container = styled.span`
  position: relative;
  display: inline-block;
  max-width: 100%;
  ${({ disabled }) => (disabled ? 'pointer-events: none;' : null)}
`;

/*
 * A padding is needed to make sure mouseLeave event is always fired correctly.
 * Browsers generally don't fire mouse events on disabled inputs.
 * By adding small padding we ensure that before leaving the activator cursor moves over non-disabled element, which triggers mouseLeave event
 */
export const Activator = styled.div`
  padding: 1rem;
  margin: -1rem;
  display: flex;
  align-items: center;
`;

const marginMixin = css`
  ${({ color }) => (color === 'dark' ? 0.66 : 1)}
`;

const seTooltipMixin = css`
  top: 100%;
  left: 50%;
  transform: translateX(-2rem);
  margin-top: ${marginMixin}rem;

  &:before,
  &:after {
    bottom: 100%;
  }

  &:before {
    left: 1rem;
    border-bottom-color: ${borderColor};
  }

  &:after {
    left: 1.1rem;
    bottom: calc(100% - 1px);
    border-bottom-color: ${backgroundColor};
  }
`;

const swTooltipMixin = css`
  top: 100%;
  right: 50%;
  transform: translateX(2rem);
  margin-top: ${marginMixin}rem;

  &:before,
  &:after {
    bottom: 100%;
  }

  &:before {
    right: 1rem;
    border-bottom-color: ${borderColor};
  }

  &:after {
    right: 1.1rem;
    bottom: calc(100% - 1px);
    border-bottom-color: ${backgroundColor};
  }
`;

const neTooltipMixin = css`
  bottom: 100%;
  left: 50%;
  transform: translateX(-2rem);
  margin-bottom: ${marginMixin}rem;

  &:before,
  &:after {
    top: 100%;
  }

  &:before {
    left: 1rem;
    border-top-color: ${borderColor};
  }

  &:after {
    left: 1.1rem;
    top: calc(100% - 1px);
    border-top-color: ${backgroundColor};
  }
`;

const nwTooltipMixin = css`
  bottom: 100%;
  right: 50%;
  transform: translateX(2rem);
  margin-bottom: ${marginMixin}rem;

  &:before,
  &:after {
    top: 100%;
  }

  &:before {
    right: 1rem;
    border-top-color: ${borderColor};
  }

  &:after {
    right: 1.1rem;
    top: calc(100% - 1px);
    border-top-color: ${backgroundColor};
  }
`;

const nTooltipMixin = css`
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: ${marginMixin}rem;

  &:before {
    top: 100%;
    left: calc(50% - ${({ color }) => (color === 'dark' ? 0.66 : 1.1)}rem);
    border-top-color: ${borderColor};
  }

  &:after {
    top: calc(100% - 1px);
    left: calc(50% - ${({ color }) => (color === 'dark' ? 0.66 : 1)}rem);
    border-top-color: ${backgroundColor};
  }
`;

const sTooltipMixin = css`
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: ${marginMixin}rem;

  &:before {
    bottom: 100%;
    left: calc(50% - ${({ color }) => (color === 'dark' ? 0.66 : 1.1)}rem);
    border-bottom-color: ${borderColor};
  }

  &:after {
    bottom: calc(100% - 1px);
    left: calc(50% - ${({ color }) => (color === 'dark' ? 0.66 : 1)}rem);
    border-bottom-color: ${backgroundColor};
  }
`;

const eTooltipMixin = css`
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: ${marginMixin}rem;

  &:before {
    right: 100%;
    top: calc(50% - ${({ color }) => (color === 'dark' ? 0.66 : 1.1)}rem);
    border-right-color: ${borderColor};
  }

  &:after {
    left: ${({ color }) => (color === 'dark' ? -0.46 : -1)}rem;
    top: calc(50% - ${({ color }) => (color === 'dark' ? 0.56 : 1)}rem);
    border-right-color: ${backgroundColor};
  }
`;

const wTooltipMixin = css`
  right: calc(100% + ${marginMixin}rem);
  top: 50%;
  transform: translateY(-50%);
  margin-right: 0;

  &:before {
    left: 100%;
    top: calc(50% - ${marginMixin}rem);
    border-left-color: ${borderColor};
  }

  &:after {
    right: ${({ color }) => (color === 'dark' ? -0.46 : -1)}rem;
    top: calc(50% - ${marginMixin}rem);
    border-left-color: ${backgroundColor};
  }
`;

const fixedTooltipMixin = css`
  top: unset;
  bottom: unset;
  left: unset;
  right: unset;
`;

const nFixedTooltipMixin = css`
  transform: translate(-50%, -100%);
  margin-top: -1rem;
`;

const nwFixedTooltipMixin = css`
  transform: translate(calc(-100% + 1rem + ${marginMixin}rem), -100%);
  margin-top: -1rem;
`;

const neFixedTooltipMixin = css`
  transform: translate(calc(-1.2rem - ${marginMixin}rem), -100%);
  margin-top: -1rem;
`;

const sFixedTooltipMixin = css`
  transform: translateX(-50%);
  margin-top: 1rem;
`;

const swFixedTooltipMixin = css`
  transform: translateX(calc(-100% + 1rem + ${marginMixin}rem));
  margin-top: 1rem;
`;

const wFixedTooltipMixin = css`
  transform: translate(calc(-100% - ${marginMixin}rem), -50%);
`;

const nPseudoMixin = css`
  &:before,
  &:after {
    border-bottom-width: 0 !important;
  }
`;

const ePseudoMixin = css`
  &:before,
  &:after {
    border-left-width: 0 !important;
  }
`;

const sPseudoMixin = css`
  &:before,
  &:after {
    border-top-width: 0 !important;
  }
`;

const wPseudoMixin = css`
  &:before,
  &:after {
    border-right-width: 0 !important;
  }
`;

const flashTooltipMixin = css`
  &,
  &:before,
  &:after {
    transition: all 1000ms ease-in-out;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  z-index: 2100;
  background-color: ${backgroundColor};

  &:before,
  &:after {
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    content: '';
    border-color: transparent;
    border-style: solid;
  }

  ${({ flash, transition }) => transition && !flash && flashTooltipMixin}

  ${({ position }) => {
    switch (position) {
      case 'N':
        return nTooltipMixin;
      case 'S':
        return sTooltipMixin;
      case 'E':
        return eTooltipMixin;
      case 'W':
        return wTooltipMixin;
      case 'NW':
        return nwTooltipMixin;
      case 'NE':
        return neTooltipMixin;
      case 'SW':
        return swTooltipMixin;
      case 'SE':
        return seTooltipMixin;
      default:
        return seTooltipMixin;
    }
  }}

  ${({ fixed }) => fixed && fixedTooltipMixin}

  ${({ position, fixed }) => {
    if (!fixed) {
      return null;
    }
    switch (position) {
      case 'N':
        return nFixedTooltipMixin;
      case 'S':
        return sFixedTooltipMixin;
      case 'W':
        return wFixedTooltipMixin;
      case 'NW':
        return nwFixedTooltipMixin;
      case 'NE':
        return neFixedTooltipMixin;
      case 'SW':
        return swFixedTooltipMixin;
      default:
        return null;
    }
  }}

  ${({ position }) => {
    switch (position) {
      case 'N':
      case 'NW':
      case 'NE':
        return nPseudoMixin;
      case 'E':
        return ePseudoMixin;
      case 'S':
      case 'SW':
      case 'SE':
        return sPseudoMixin;
      case 'W':
        return wPseudoMixin;
      default:
        return null;
    }
  }}
`;

export const TooltipLight = styled(Tooltip)`
  color: ${Colors.text};
  border: solid 1px ${borderColor};
  border-radius: 6px;
  padding: 0.8rem;
  ${({ shadow }) => shadow && `box-shadow: 0 4px 8px 0 ${Colors.grey};`}

  &:before {
    border-width: 1.15rem;
  }

  &:after {
    border-width: 1.05rem;
  }
`;

export const TooltipDark = styled(Tooltip)`
  color: ${Colors.white};
  border: none;
  padding: 0.5rem 1rem;

  &:before {
    border-width: 0.6rem;
  }

  &:after {
    border-width: 0.5rem;
  }
`;

export const Content = styled.div`
  width: ${({ size }) => {
    switch (size) {
      case 'vsmall':
        return '18rem';
      case 'small':
        return '20rem';
      case 'normal':
        return '30rem';
      default:
        return size || 'auto';
    }
  }};
  white-space: ${({ size }) => (size ? 'pre-wrap' : 'pre')};
  max-width: 100rem;
  ${({ theme }) => theme.typography.text.normal};
  font-weight: 400;
  line-height: 1.4;
  text-align: left;
`;
