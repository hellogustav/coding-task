import styled from 'styled-components';

import { IS_MOBILE } from 'utils/constants';
import {
  sidebarWidth,
  sidebarSubMenuWidth,
} from 'components/structure/page/utils/calculations';
import { Colors } from '../../../utils/styles/ui';

export const Flexbox = styled.div`
  align-items: ${(props) => props.alignItems || 'flex-end'};
  display: flex;
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  margin-bottom: 0;
  margin-top: 0;
  padding: 0;
  width: 100%;
`;

export const Fullscreen = styled(Flexbox)`
  background-color: ${({ isLight }) =>
    isLight ? Colors.whiteTransparent : Colors.darkGrayTransparent};
  flex-direction: column;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2001;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 140rem;
`;

export const GrayContainer = styled(Container)`
  background-color: ${Colors.greyLighter};
`;

export const WhiteContainer = styled(Container)`
  background-color: ${Colors.white};
`;

export const FormContainer = styled(Container)`
  padding: 0;
  background-color: ${Colors.white};
  justify-content: initial;

  & > form {
    box-shadow: none;
    margin: 3rem 0;
    border: 1px solid ${Colors.outline};
  }
`;

export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
`;

export const AppBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${({ hasSidebar, sidebarExpanded }) => {
    if (hasSidebar && sidebarExpanded) {
      return sidebarWidth + sidebarSubMenuWidth;
    }
    return hasSidebar ? sidebarWidth : 0;
  }}rem;
  ${({ hasSubMenu }) =>
    hasSubMenu && 'transition: padding-left 0.3s ease-in-out;'}
  ${!IS_MOBILE && 'min-width: 87rem;'}
  max-width: 100%;
  flex: 1;
`;

export const EmptyContainer = styled.div``;
