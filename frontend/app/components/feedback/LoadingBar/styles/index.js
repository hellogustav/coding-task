import styled from 'styled-components';

import { ImmutableLoadingBar } from 'react-redux-loading-bar';

export const LoadingBar = styled(ImmutableLoadingBar)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  height: 2px;
  z-index: 99999;
  transition: all 200ms ease;
  pointer-events: none;

  &:after {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary},
      0 0 5px ${({ theme }) => theme.colors.primary};
    transform: rotate(3deg) translate(0, -4px);
    content: '';
  }
`;
