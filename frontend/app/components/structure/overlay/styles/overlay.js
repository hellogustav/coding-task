import styled, { css, createGlobalStyle } from 'styled-components';

import { Flexbox, Fullscreen } from '../../page/styles/containers';

import { CloseButton } from '../../../visual/buttons/close';
import { GoToButton } from '../../../visual/buttons/goto';

const buttonHalfSize = 32;
function calculateViewTopPosition({ fitScreen, height }) {
  if (fitScreen || !window.innerHeight || !height) return '';
  // give space to close button
  const diffSize = height + buttonHalfSize - window.innerHeight;

  if (diffSize <= 0) return '';

  const top = diffSize / 2;
  return `top: ${top}px`;
}

export const View = styled(Flexbox)`
  align-items: center;
  position: relative;
  width: auto;

  ${({ fitScreen }) => fitScreen && 'height: 100%;'}
  ${calculateViewTopPosition}
`;

export const Close = styled(CloseButton)`
  position: absolute;
  top: -1.6rem;
  right: -1.6rem;

  &,
  &:focus {
    z-index: 2100;
  }
`;

const smallButtonMixin = css`
  width: 3rem;
  ${({ theme }) => theme.typography.button.medium};
  svg {
    position: relative;
  }
`;

export const Prev = styled(GoToButton)`
  margin-right: 2rem;
  ${({ isSmall }) => (isSmall ? smallButtonMixin : null)}
`;

export const Next = styled(GoToButton)`
  margin-left: 2rem;
  ${({ isSmall }) => (isSmall ? smallButtonMixin : null)}
`;

export const Overlay = styled(Fullscreen)`
  ${({ zIndex }) => zIndex && `z-index: ${zIndex};`}
  flex-direction: row;
  ${({ pullRight }) => (pullRight ? `left: ${pullRight};` : null)}
  ${({ backgroundUrl }) =>
    backgroundUrl &&
    `background: url(${backgroundUrl}) center center / cover no-repeat;`}

  & > ${View} {
    ${({ isStaleIntegration }) =>
      isStaleIntegration ? 'align-self: flex-start; top: 10rem;' : null}
  }
  & > ${Prev}, & > ${Next} {
    ${({ isStaleIntegration }) =>
      isStaleIntegration ? 'align-self: flex-start; top: 40rem;' : null}
  }

  ${({ height }) => height && `height: ${height}px;`}
  ${({ fitScreen }) => !fitScreen && `overflow-y: auto;`}
  transition: height 0.2s ease-out;
`;

export const GlobalScrollLock = createGlobalStyle`
  html {
    overflow: hidden !important;
  }
`;
