import styled from 'styled-components';

import { Colors } from 'components/utils/styles/ui';

import { InputText } from '../../input/styles/inputs';
export const TextareaBase = InputText.withComponent('textarea');

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Textarea = styled(TextareaBase)`
  line-height: 2.2rem;
  min-height: ${({ rows }) => (rows ? '0' : '10rem')};
  max-height: ${({ maxHeight = '20rem' }) => maxHeight};
  padding: 1.4rem;
  outline: none;
  resize: ${({ autoheight }) => (autoheight ? 'none' : 'vertical')};
  ${({ rows }) => rows && 'height: auto;'}

  &:disabled {
    background: ${Colors.tealLighter};
  }
`;

export const CharactersCounter = styled.div`
  margin-top: 1rem;

  ${({ theme }) => theme.typography.text.small};
`;
