import styled from 'styled-components';

import { Colors, strongShadow } from 'components/utils/styles/ui';

export const Window = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 92rem;
  min-height: 55rem;
  margin: 0;
  background-color: ${Colors.white};
  border-radius: 0.6rem;
  box-shadow: ${strongShadow};
`;

export const WindowTitle = styled.h2`
  color: ${Colors.text};
  font-size: 2.4rem;
  font-weight: 400;
  height: 5.7rem;
  margin: 0;
  padding: 1.5rem 2.5rem;
`;

export const Row = styled.div`
  display: flex;
  flex: 1;
  border-radius: 0 0 0.6rem 0.6rem;
  justify-content: ${({ justifyContent = 'unset' }) => justifyContent};
`;
