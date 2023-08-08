import { keyframes } from 'styled-components';

import { Colors } from 'components/utils/styles/ui';

export const rotate360 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const scale15x = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.5); }
  100% { transform: scale(1); }
`;

export const slideInFromRight = keyframes`
  0% { transform: translate3d(100%, 0, 0); }
  100% { transform: translate3d(0, 0, 0); }
`;

export const slideOutToRight = keyframes`
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(100%, 0, 0); }
`;

export const overlayFadeIn = keyframes`
  0% { background-color: ${Colors.transparent}; }
  100% { background-color: ${Colors.darkGrayTransparent}; }
`;

export const overlayFadeOut = keyframes`
  0% { background-color: ${Colors.darkGrayTransparent}; }
  100% { background-color: ${Colors.transparent}; }
`;

export const moveRight = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(0.6rem); }
  100% { transform: translateX(0); }
`;

export const pulse = keyframes`
  0% {background-position: left;}
  100% {background-position: right;}
`;
