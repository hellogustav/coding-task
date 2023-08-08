import styled from 'styled-components';

import { Button } from 'components/elements/button';

export const Header = styled(Button)`
  font-size: 1.3rem;
  font-weight: 400;
  padding-left: 0;

  & > svg {
    position: absolute;
    right: 0;
    top: 0.4rem;
  }
`;

export const Label = styled.span`
  padding-right: 2rem;
`;

export const IconChevrons = styled.span`
  & > svg {
    position: absolute;
    right: 0;
  }

  & > svg:first-of-type {
    top: 0;
  }

  & > svg:last-of-type {
    top: 0.8rem;
  }
`;
