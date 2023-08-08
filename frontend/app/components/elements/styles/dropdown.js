import styled from 'styled-components';

import { Menu } from 'components/navigation/menu/menu';
import { InputText } from 'components/form/input/text';
import { Button } from 'components/elements/button';

import { Colors, materialShadow } from 'components/utils/styles/ui';

import { Icon as IconBase } from '../icon';
import { iconElementsSelector } from './icon';

export const Select = styled.div`
  background-color: ${Colors.white};
  display: block;
  position: relative;
  width: 100%;
`;

export const Icon = styled(IconBase).attrs({
  size: 'large',
  color: Colors.textLighter,
})`
  flex-shrink: 0;
  pointer-events: none;
  ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft};`}
`;

export const Divider = styled.div`
  height: 2.6rem;
  width: 1px;
  margin: 0 0.8rem;
  background-color: ${Colors.inputOutline};
`;

export const OptionSelectedLink = styled.a`
  align-items: center;
  color: ${Colors.text};
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  width: 100%;
  padding: ${(props) => props.padding || '0 1rem'};

  ${({ theme }) => theme.typography.link.normal};
`;

export const ClearSelection = styled(Button)`
  position: absolute;
  width: 4rem;
  right: 2.4rem;
  height: 100%;

  & > ${iconElementsSelector} {
    stroke: ${Colors.textLighter} !important;
  }
`;

export const OptionSelectedButton = styled(
  OptionSelectedLink.withComponent('button')
)`
  background-color: transparent;
  border: none;
  text-align: left;

  &:focus {
    outline: none;
  }
`;

export const Options = styled(Menu)`
  white-space: normal;
`;

export const OptionsWrapper = styled.div`
  background-color: ${Colors.white};
  border: solid 1px ${Colors.inputOutline};
  border-radius: 0.6rem;
  box-shadow: ${materialShadow};
  display: ${(props) => (props.activeMenu ? 'block' : 'none')};
  left: -1px;
  right: -1px;
  padding: 0;
  position: absolute;
  top: 3.5rem;
  z-index: 1010;
  overflow: hidden;

  ${({ hidden }) => hidden && `visibility: hidden;`}

  & li {
    ${({ size }) => size === 'small' && 'padding: 0;'}
  }
`;

export const OptionsTypeahead = styled(InputText)`
  height: ${({ size }) => (size === 'small' ? '3rem' : '4rem')};
  border-radius: 0.5rem;
`;

export const EmptyState = styled.div`
  color: ${Colors.text};
  font-style: italic;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: not-allowed;
  pointer-events: all !important;
`;
