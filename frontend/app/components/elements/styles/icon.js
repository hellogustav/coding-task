import styled, { css } from 'styled-components';

import { Colors } from 'components/utils/styles/ui';

export const ShapeWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: ${({ color }) => Colors[color] || color};
`;

export const Circle = styled(ShapeWrapper)`
  border-radius: 100px;
`;

export const Square = styled(ShapeWrapper)`
  border-radius: 3px;
`;

export const CircleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  margin-right: 1.6rem;
  background-color: ${Colors.white};
  border: 0.2rem solid ${({ color }) => Colors[color] || color};
  border-radius: 50%;
  box-shadow: 0 0 0 0.4rem ${({ shadow }) => Colors[shadow] || shadow};
`;

export const CounterWrapper = styled.div`
  position: relative;
`;

const iconPillMixin = css`
  width: auto;
  padding: 0.1rem 0.2rem 0 0.2rem;
  right: -50%;
`;

export const IconCounter = styled.div`
  position: absolute;
  right: -0.3rem;
  bottom: -0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  padding: 0.1rem 0 0 0;
  background-color: ${({ color }) => Colors[color] || color};
  border: 1px solid ${Colors.white};
  border-radius: 0.5rem;
  color: ${Colors.white};
  font-size: 0.8rem;

  ${({ digits }) => digits > 1 && iconPillMixin}
`;

export const iconElementsSelector = css`
  svg g, svg path , svg circle, svg ellipse, svg line, svg polygon, svg polyline, svg rect:not(:first-child)
`;

export const selfIconElementsSelector = css`
  & g, & path , & circle, & ellipse, & line, & polygon, & polyline, & rect:not(:first-child)
`;
