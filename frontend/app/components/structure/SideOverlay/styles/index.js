import styled, { css, createGlobalStyle } from 'styled-components';

import { Icon as IconBase } from 'components/elements/icon';
import { Button as ButtonBase } from 'components/elements/button';
import { Fullscreen } from 'components/structure/page/styles/containers';
import { Colors } from 'components/utils/styles/ui';
import {
  slideInFromRight,
  slideOutToRight,
  overlayFadeIn,
  overlayFadeOut,
} from 'components/utils/styles/animations';
import { selfIconElementsSelector } from 'components/elements/styles/icon';

export const Overlay = styled(Fullscreen)`
  animation: ${({ isClosing }) => (isClosing ? overlayFadeOut : overlayFadeIn)}
    200ms ease-out 0ms 1;
  background-color: ${({ isClosing }) =>
    isClosing ? Colors.transparent : Colors.darkGrayTransparent};
`;

export const GlobalScrollLock = createGlobalStyle`
  html {
    overflow: hidden !important;
  }
`;

export const View = styled.div`
  position: relative;
  width: ${({ width }) => width || '45.8rem'};
  height: 100vh;
  background-color: ${Colors.white};
  border-left: 0.1rem solid ${Colors.outline};
  animation: ${({ isClosing }) =>
      isClosing ? slideOutToRight : slideInFromRight}
    200ms ease-out 0ms 1;
  transform: ${({ isClosing }) =>
    css`translate3d(${isClosing ? '100%' : 0}, 0, 0)`};
  ::-webkit-scrollbar {
    width: 0 !important;
  }
`;

export const Header = styled.h3`
  margin: 0;
  position: sticky;
  top: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  padding: 0 3rem;
  background-color: ${Colors.tealDarker};
  color: ${Colors.white};
`;

export const Close = styled(IconBase)`
  cursor: pointer;

  ${selfIconElementsSelector} {
    pointer-events: none;
    stroke: ${Colors.white};
  }
`;

export const SubHeader = styled.h4`
  color: ${Colors.tealDark};
  margin: 0 0 1rem 0;

  &:not(:first-child) {
    margin-top: 3rem;
  }
`;

export const Content = styled.div`
  padding: 1.8rem 2.8rem;
  height: calc(100% - 11.1rem);
  overflow: hidden auto;
`;

export const Footer = styled.div`
  position: sticky;
  bottom: 0;
  width: inherit;
  display: flex;
  justify-content: space-between;
  padding: 1.2rem 2.8rem;
  background-color: ${Colors.tealLighter};
  border-top: 0.1rem solid ${Colors.outline};
`;

export const ButtonCancel = styled(ButtonBase).attrs({
  type: 'inverted',
  color: 'mono',
})`
  color: ${Colors.text};
  border-color: ${Colors.greyDarker};
`;
