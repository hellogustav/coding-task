import styled from 'styled-components';
import { Colors } from 'components/utils/styles/ui';
import { ButtonGroup as ButtonGroupBase } from 'components/elements/styles/button';

export const Modal = styled.div`
  position: relative;
  margin: 0 auto;
  padding: ${({ align }) => (align === 'left' ? '3rem 5rem' : '3rem 2rem')};
  width: 520px;
  max-height: calc(100vh - 40px);
  overflow: auto;
  background-color: ${Colors.white};
  border-radius: 6px;
  text-align: ${({ align }) => (align === 'left' ? 'left' : 'center')};
  ${({ theme }) => theme.typography.text.medium};
`;

export const Title = styled.h1`
  margin: 0 0 2rem;
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 0.4px;
  color: ${Colors.tealDark};
`;

export const Message = styled.p`
  margin: 0 0 2rem;
  color: ${Colors.text};
  ${({ theme }) => theme.typography.text.medium};

  & > span > span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ButtonGroup = styled(ButtonGroupBase)`
  display: flex;
  justify-content: ${({ align }) =>
    align === 'right' ? 'flex-end' : 'center'};
`;
