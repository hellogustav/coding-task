import styled from 'styled-components';

export const ButtonSet = styled.div`
  display: flex;
  flex-direction: ${({ isVertical }) => (isVertical ? 'column' : 'row')};
  justify-content: ${({ isVertical, align }) =>
    isVertical ? 'center' : align};
  align-items: ${({ isVertical, align }) => (isVertical ? align : 'center')};
  padding: ${({ isPadded }) => (isPadded ? 1 : 0)}rem;

  & > * + * {
    margin-left: 1rem;
    margin-left: ${({ isVertical }) => (!isVertical ? 1 : 0)}rem;
    margin-top: ${({ isVertical }) => (isVertical ? 1 : 0)}rem;
  }
`;
