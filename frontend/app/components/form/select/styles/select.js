import styled, { css } from 'styled-components';

import { Colors } from 'components/utils/styles/ui';

import { Dropdown } from 'components/elements/dropdown';
import { OptionsWrapper, Options } from 'components/elements/styles/dropdown';
import { LinkItem } from 'components/navigation/menu/styles/link';
import { Truncate as TruncateBase } from 'components/text/Truncate/styles';

export const Selected = styled.span`
  display: flex;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ArchivedSelection = styled(Selected)`
  color: ${Colors.red};
`;

const optionsTopMixin = css`
  bottom: ${({ size }) => (size === 'small' ? '3.675rem' : '4.2rem')};
  top: auto;
`;

const optionsBottomMixin = css`
  top: ${({ size }) => (size === 'small' ? '3.675rem' : '4.2rem')};
  bottom: auto;
`;

const currencyOptionMixin = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > :first-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 400;
  }

  & > :last-child {
    font-weight: 500;
    line-height: 1.75rem;
  }
`;

const currencyMixin = css`
  ${Options} ${LinkItem} {
    ${currencyOptionMixin}
  }

  ${Selected} {
    margin-right: 1rem;
    ${currencyOptionMixin}
  }
`;

export const Select = styled(Dropdown)`
  align-items: center;
  border: solid 1px ${({ theme, isValid, focused, disabled }) => {
    if (focused && !disabled) {
      return theme.colors.primary;
    }
    return isValid ? Colors.inputOutline : Colors.red;
  }}};
  border-radius: .3rem;
  display: flex;
  flex-direction: column;
  height: ${({ size }) => (size === 'small' ? '3rem' : '4rem')};
  min-width: 18rem;
  white-space: nowrap;
  background-color: ${({ disabled }) =>
    disabled ? Colors.greyLighter : Colors.white};

  ${OptionsWrapper} {
    ${({ optionsPosition }) =>
      optionsPosition === 'top' ? optionsTopMixin : optionsBottomMixin}
  }

  ${Options} > * {
    ${({ optionsHeight, listWithoutPlaceholder }) =>
      optionsHeight &&
      `max-height: ${
        optionsHeight * (listWithoutPlaceholder ? 4 : 5)
      }rem !important;`}
  }

  ${({ inputType }) => inputType === 'currency' && currencyMixin}

  ${LinkItem} {
    white-space: normal;
    ${({ theme }) => theme.typography.text.normal}
  }
`;

export const OptionName = styled(TruncateBase)``;

export const SelectBox = styled(Select)`
  border: 0;
  width: 22.5rem;
`;

export const SelectBoxToolbar = styled(SelectBox)`
  height: 3rem;
`;

export const NarrowVerticalboxIcon = styled.span`
  align-items: center;
  display: flex;
  margin-right: 1rem;
`;
