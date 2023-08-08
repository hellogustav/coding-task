import styled from 'styled-components';

import { Icon as IconBase } from 'components/elements/icon';
import { Colors } from 'components/utils/styles/ui';
import { isPositive, isZero } from 'components/utils/numeric';

import { BOX_SIZES } from '../constants/avatar';

const radiusFor = function radiusFor(shape) {
  switch (shape) {
    case 'rounded':
      return '50%';
    case 'square-rounded':
      return '0.6rem';
    default:
      return 0;
  }
};

const scoreUIDimensions = function scoreUIDimensions(size) {
  switch (size) {
    case 'large':
      return `
        border-radius: 2rem;
        ${({ theme }) => theme.typography.text.medium};
        padding: .6rem 1rem .4rem;
        transform: translate(-2rem, 4.5rem);
      `;

    case 'medium':
    default:
      return `
        border-radius: 2rem;
        font-size: 1.15rem;
        padding: .5rem .7rem .3rem;
        transform: translate(-1rem, 2rem);
      `;
  }
};

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  height: ${(props) => BOX_SIZES[props.size]}rem;
  width: ${(props) => BOX_SIZES[props.size]}rem;
  flex-shrink: 0;
  ${({ clickable }) => (clickable ? 'cursor: pointer' : null)};
`;

export const Avatar = styled.img`
  background-color: ${({ src, noInitials }) =>
    !src && noInitials ? Colors.teal : Colors.white};
  border: solid 1px ${Colors.outline};
  border-radius: ${({ shape }) => radiusFor(shape)};
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export const Initials = styled.img`
  border-radius: ${({ shape }) => radiusFor(shape)};
  height: 100%;
  width: 100%;
`;

export const WithScore = styled.div`
  height: auto;
  width: auto;

  &::after {
    background-color: ${(props) =>
      isPositive(props.score) ? Colors.green : Colors.red};
    border: solid 0.2rem ${Colors.white};
    color: ${Colors.white};
    content: '${(props) =>
      isPositive(props.score) ? props.score : props.score * -1}';
    display: ${(props) => (isZero(props.score) ? 'none' : 'inline-block')};
    font-weight: 400;
    position: absolute;
    ${({ size }) => scoreUIDimensions(size)}
  }
`;

export const ActivityIndicator = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${({ active }) => (active ? Colors.green : Colors.grey)};
  width: ${({ size }) => BOX_SIZES[size] / 3.5}rem;
  height: ${({ size }) => BOX_SIZES[size] / 3.5}rem;
  border: ${({ size }) => BOX_SIZES[size] / 25}rem solid ${Colors.white};
  border-radius: ${({ shape }) => (shape === 'rounded' ? '100%' : '1rem')};
`;

export const Marker = styled(IconBase)`
  position: absolute;
  bottom: 0;
  right: -0.3rem;

  path {
    stroke: ${Colors.white} !important;
    fill: ${({ color }) => Colors[color]};
  }
`;
