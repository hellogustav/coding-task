import styled from 'styled-components';

import { Colors } from 'components/utils/styles/ui';
import { rotate360 } from 'components/utils/styles/animations';

export const PulsatingSpinner = styled.img`
  @keyframes pulse {
    0% {
      transform: scale(calc(${({ scale }) => scale} * 0.82));
    }

    40% {
      transform: scale(calc(${({ scale }) => scale} * 1));
    }

    100% {
      transform: scale(calc(${({ scale }) => scale} * 0.82));
    }
  }

  transform: scale(${({ scale }) => scale});
  animation: pulse 1000ms linear infinite;
`;

export const SpinnerWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export const Spinner = styled.div`
  @keyframes spinner {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  & > div {
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    animation: spinner 1.4925373134328357s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 5rem 5rem;
  }
  & > div > div {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
  }
  & div:nth-child(0) {
    animation-delay: 0s;
  }
  & div:nth-child(0) > div {
    background: #e8f1f2;
    transform: translate(75.73413361164941px, 68.35045716034882px);
  }
  & div:nth-child(1) {
    animation-delay: -0.062s;
  }
  & div:nth-child(1) > div {
    background: #b1e1e7;
    transform: translate(68.35045716034882px, 75.73413361164941px);
  }
  & div:nth-child(2) {
    animation-delay: -0.125s;
  }
  & div:nth-child(2) > div {
    background: #6ec5d0;
    transform: translate(59.3073372946036px, 80.95518130045147px);
  }
  & div:nth-child(3) {
    animation-delay: -0.187s;
  }
  & div:nth-child(3) > div {
    background: #0aafc4;
    transform: translate(49.22104768880207px, 83.65779445495241px);
  }
  & div:nth-child(4) {
    animation-delay: -0.25s;
  }
  & div:nth-child(4) > div {
    background: #0d92a3;
    transform: translate(38.77895231119793px, 83.65779445495241px);
  }
  & div:nth-child(5) {
    animation-delay: -0.312s;
  }
  & div:nth-child(5) > div {
    background: #0b748c;
    transform: translate(28.692662705396415px, 80.95518130045147px);
  }
  & div:nth-child(6) {
    animation-delay: -0.375s;
  }
  & div:nth-child(6) > div {
    background: #0a5566;
    transform: translate(19.649542839651176px, 75.73413361164941px);
  }
  & div:nth-child(7) {
    animation-delay: -0.437s;
  }
  & div:nth-child(7) > div {
    background: #0b3954;
    transform: translate(12.265866388350599px, 68.35045716034884px);
  }
  & {
    height: calc(${({ scale }) => scale} * 5rem);
    position: relative;
    transform: translateZ(0) scale(calc(${({ scale }) => scale} * 0.5));
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
    width: calc(${({ scale }) => scale} * 5rem);
  }
  & div {
    box-sizing: content-box;
  }
`;

export const SpinnerSmall = styled.div`
  width: 2rem;
  height: 2rem;

  border: 2px solid ${Colors.textLighter};
  border-radius: 50%;
  border-right-color: transparent !important;
  border-top-color: transparent !important;

  content: '';

  animation: ${rotate360} 500ms infinite linear;
`;
