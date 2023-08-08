import styled from 'styled-components';

export const Scrollbars = styled.div`
  ${({ horizontal }) => (horizontal ? 'overflow-x: auto;' : null)}
  ${({ vertical }) => (vertical ? 'overflow-y: auto;' : null)}
  ${({ width }) => (width ? `width: ${width};` : null)}
  ${({ height }) => (height ? `height: ${height};` : null)}
  ${({ maxHeight }) => (maxHeight ? `max-height: ${maxHeight};` : null)}
`;
