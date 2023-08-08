import styled, { css } from 'styled-components';
import { Colors } from 'components/utils/styles/ui';

const integrationFrameMixin = css`
  flex-direction: row;
  align-items: flex-start;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: 30rem;
  padding: 2rem;
  color: ${Colors.greyDarker};
  user-select: none;

  ${({ isStaleIntegration }) =>
    isStaleIntegration ? integrationFrameMixin : null}
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 4rem;
  border-radius: 6px;
  background-color: white;
  max-width: 60rem;
`;

export const Body = styled.div`
  margin-top: 2rem;
`;

export const Title = styled.div`
  margin-top: 1rem;
  ${({ theme }) => theme.typography.text.medium};
`;
