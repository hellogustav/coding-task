import styled from 'styled-components';

import { Colors } from '../../../utils/styles/ui';

export const Checkbox = styled.div`
  background-color: ${({ checked, disabled, theme }) => {
    if (disabled) {
      return Colors.greyLight;
    }
    if (checked) {
      return theme.colors.primary;
    }
    return Colors.white;
  }};

  border: 1px solid
    ${({ theme, isValid, checked, disabled, focused }) => {
      if (focused || (checked && !disabled)) {
        return theme.colors.primary;
      }
      if (disabled || isValid) {
        return Colors.inputOutline;
      }
      return Colors.red;
    }};

  border-radius: 0.3rem;
  cursor: pointer;
  height: 2.3rem;
  position: relative;
  text-align: center;
  min-width: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    align-items: center;
    display: flex;
    line-height: 2rem;
  }
`;

export const CheckboxInput = styled.input`
  cursor: pointer;
  height: 1.9rem;
  left: 0;
  opacity: 0;
  position: absolute;
  width: 2rem;
  z-index: 2;
`;
