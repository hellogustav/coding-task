import styled from 'styled-components';

import { Button } from 'components/elements/button';

export const Close = styled(Button)`
  border-radius: 3rem;
  cursor: pointer;
  height: 3.2rem;
  padding: 0.1rem 0 0;
  width: 3.2rem;

  svg {
    height: auto;
    width: auto;
  }
`;

export const Delete = styled(Button)`
  border-radius: 1rem;
  cursor: pointer;
  height: 1.8rem;
  padding: 0;
  width: 1.8rem;
`;

export const Arrow = styled(Button)`
  height: 4.5rem;
  padding: 0;
  width: 4.5rem;

  svg {
    height: auto;
    width: auto;
  }
`;
