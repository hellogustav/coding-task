import styled from 'styled-components';

import { Flexbox } from 'components/structure/page/styles/containers';

import { Colors } from 'components/utils/styles/ui';

import { FormLabel as FormLabelBase } from 'components/form/label/label';

export const Radiobutton = styled.div`
  align-items: center;
  background-color: ${({ disabled }) =>
    disabled ? Colors.grey : Colors.white};
  border: solid 2px
    ${({ theme, isValid, focused }) => {
      if (focused) {
        return theme.colors.primary;
      }
      if (isValid) {
        return Colors.inputOutline;
      }
      return Colors.red;
    }};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  flex: 0 0 auto;
  width: 1.5rem;
  height: 1.5rem;
  justify-content: center;
  position: relative;
  text-align: center;
`;

export const RadioChecked = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 0.9rem;
  height: 0.9rem;
`;

export const RadioInput = styled.input`
  cursor: pointer;
  height: 1.3rem;
  left: 0;
  opacity: 0;
  position: absolute;
  width: 1.3rem;
  z-index: 2;
`;

export const FormLabel = styled(FormLabelBase)`
  margin: 0 0 0 1.4rem;
  cursor: pointer;

  ${({ theme }) => theme.typography.text.normal};
`;

export const Description = styled(FormLabelBase)`
  margin: 0.6rem 0 0 0;
  font-size: 1.3rem;
  letter-spacing: 0;
  line-height: 2.2rem;
  cursor: pointer;
`;

export const RadioFieldset = styled(Flexbox)`
  flex-direction: ${({ inline }) => (inline ? 'row' : 'column')};
  align-items: ${({ inline }) => (inline ? 'flex-end' : 'flex-start')};

  ${Radiobutton} {
    background-color: ${({ disabled }) =>
      disabled ? Colors.greyLighter : Colors.white};
  }
`;

export const RadioContainer = styled(Flexbox)`
  align-items: center;
  margin-bottom: ${({ inline }) => (inline ? '0' : '2.1rem')};
  margin-right: 6rem;
  width: auto;
`;

export const RichContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: 0.1rem solid ${Colors.outline};
  border-radius: 0.3rem;
  padding: 1.5rem;
  margin-top: 1.2rem;
  background-color: ${({ checked }) =>
    checked ? Colors.tealLighter : Colors.greyLighter};
  ${({ disabled }) => (disabled ? null : 'cursor: pointer;')}

  & + & {
    margin-top: 2rem;
  }

  ${FormLabel} {
    margin: 0;
    font-weight: 500;
    color: ${Colors.tealDark};
  }

  ${Radiobutton} {
    width: 2rem;
    height: 2rem;
    margin-left: 1rem;
    ${({ theme, checked }) =>
      checked && `border-color: ${theme.colors.primary};`}
  }

  ${RadioChecked} {
    width: 1.2rem;
    height: 1.2rem;
  }
`;
