import styled from 'styled-components';

import { Colors } from '../../../utils/styles/ui';

import { contextHeaderHeight } from '../utils/calculations';

export const ContextHeader = styled.div`
  align-items: center;
  background-color: ${Colors.white};
  display: flex;
  height: ${contextHeaderHeight}rem;
  padding: 0 2rem;
`;
