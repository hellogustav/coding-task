import styled from 'styled-components';

export const Emoji = styled.span`
  &::before {
    font-family: 'Apple Color Emoji', 'Noto Color Emoji';
    content: ${({ code }) => `"\0${code}"`};
  }
`;
