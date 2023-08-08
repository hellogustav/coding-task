import styled, { css } from 'styled-components';
import { isEmpty } from 'lodash';

import { Colors } from 'components/utils/styles/ui';
import { Icon as IconBase } from 'components/elements/icon';

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const rightInputPadding = ({ clearable, rightIndicator }) => {
  if (rightIndicator) {
    return 5;
  }
  if (clearable) {
    return 2.4;
  }
  return 1;
};

export const InputText = styled.input`
  background-color: ${({ readOnly }) =>
    readOnly ? Colors.greyLighter : Colors.white};
  border: ${(props) =>
    `solid 1px ${props.isValid ? Colors.inputOutline : Colors.red}`};
  border-radius: 0.3rem;
  color: ${({ readOnly, theme }) =>
    readOnly ? theme.colors.primary : Colors.text};
  display: block;
  height: ${({ size }) => (size === 'small' ? '3rem' : '4rem')};
  padding: 1rem ${rightInputPadding}rem 1rem
    ${({ hasPlaceholderIcon }) => (hasPlaceholderIcon ? 3.5 : 1)}rem;
  width: 100%;
  ${({ value }) => (isEmpty(value) ? 'text-overflow: ellipsis;' : null)}

  &:focus {
    outline: none;
    border: solid 1px ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    background-color: ${Colors.greyLighter};
  }

  &::placeholder {
    color: ${Colors.textLighter};
  }

  &::-webkit-contacts-auto-fill-button,
  &::-webkit-credentials-auto-fill-button {
    display: none !important;
    pointer-events: none;
    position: absolute;
    right: 0;
    visibility: hidden;
  }
`;

export const InputSearch = styled(InputText)`
  border: solid 1px ${Colors.inputOutline};
  ${({ iconPosition }) =>
    iconPosition === 'left' ? 'padding-left: 3.5rem' : 'padding-right: 5rem'};
`;

export const SearchIcon = styled.a`
  ${({ iconType = 'MagnifyingGlass' }) => {
    if (iconType === 'X') {
      return `
        background: ${Colors.greyDark};
        border-radius: 2rem;
        cursor: pointer;
        padding: .4rem;
      `;
    }

    return '';
  }};
  align-items: center;
  display: inline-flex;
  font-size: 0.1rem;
  position: absolute;
  ${({ iconPosition }) =>
    iconPosition === 'left' ? 'left: 0.8rem' : 'right: 0.8rem'};
  top: 50%;
  transform: translateY(-50%);
`;

export const PwdIcon = styled.a`
  cursor: pointer;
  display: inline-block;
  position: absolute;
  right: 2.1rem;
  top: 1rem;
`;

export const Indicator = styled.span`
  align-items: center;
  border-left: solid 1px ${Colors.inputOutline};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  font-size: 2rem;
  height: 4rem;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 4rem;
`;

const optionsMixin = css`
  top: ${({ optionsPosition, height }) =>
    optionsPosition === 'top'
      ? `calc(-${height}rem - 0.4rem)`
      : 'calc(100% + 0.4rem)'};
`;

export const AutocompleteOptions = styled.ul`
  position: absolute;
  left: 0;
  z-index: 1000;
  overflow: hidden visible;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0.2rem solid ${Colors.grey};
  border-radius: 0.6rem;
  background: ${Colors.white};
  max-height: ${({ maxOptionsHeight }) => `${maxOptionsHeight}rem`};

  ${optionsMixin};
`;

const optionActiveMixin = css`
  color: ${Colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const AutocompleteOption = styled.li`
  display: flex;
  align-items: center;
  height: 4rem;
  padding: 0 1rem;
  border-top: 0.1rem solid ${Colors.grey};
  cursor: pointer;

  &:first-child {
    border-top: 0;
  }

  &:hover {
    ${optionActiveMixin}
  }

  ${({ active }) => active && optionActiveMixin}

  & span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const AutocompleteIcon = styled(IconBase)`
  margin-right: 1rem;
`;

export const PlaceholderIcon = styled.span`
  display: flex;
  position: absolute;
  right: 0;
  left: 0;
  width: 3.5rem;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const AutocompleteClear = styled.div`
  position: absolute;
  top: 0;
  right: 0.8rem;
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
`;

export const Highlight = styled.span`
  font-weight: 500;

  & > mark {
    background-color: inherit;
    color: inherit;
    font-weight: 400;
  }
`;
