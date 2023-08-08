import styled from 'styled-components';

import { Colors } from 'components/utils/styles/ui';
import { WhiteContainer } from 'components/structure/page/styles/containers';

export const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${Colors.white};
`;

export const Sidebar = styled.div`
  position: fixed;
  display: flex;
  height: 100%;
  z-index: 1100;
  pointer-events: none;
`;

export const Body = styled.div`
  margin-left: ${({ sidebarExpanded }) => (sidebarExpanded ? '23rem' : '0')};
  transition: margin-left 0.3s ease-in-out;
  height: 100%;
`;

export const Expander = styled.div`
  position: absolute;
  width: 1.2rem;
  height: 10rem;
  top: calc(50% - 5rem);
  border-radius: 0 1.2rem 1.2rem 0;
  background-color: ${Colors.tealDark};
  cursor: pointer;
  z-index: 498;

  transition: left 0.3s ease-in-out;

  & > svg {
    margin-top: 4.3rem;
    margin-left: -0.1rem;
  }
  pointer-events: auto;
`;

export const SettingsContainer = styled(WhiteContainer)`
  position: relative;
  padding: 3rem;
  min-width: 70rem;
  max-width: 120rem;
`;
