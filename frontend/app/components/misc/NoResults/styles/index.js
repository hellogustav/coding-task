import styled from 'styled-components';
import { Colors } from 'components/utils/styles/ui';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: ${({ noPadding }) => (noPadding ? '0' : '4rem 2rem')};
  background-color: ${Colors.white};
  color: ${Colors.text};
`;

export const Illustration = styled.img`
  display: block;
  margin: 0 auto;
`;

export const Title = styled.h2`
  margin: 0;
  margin-top: 4rem;
  font-weight: 400;
`;

export const Subtitle = styled.div`
  margin-top: 1rem;

  ${({ theme }) => theme.typography.text.medium};
`;
