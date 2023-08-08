import styled from 'styled-components';

import { Colors } from 'components/utils/styles/ui';

export const Highlight = styled.span`
  & > span {
    color: ${Colors.tealDark};
    font-weight: 500;
  }

  & > b {
    font-weight: 500;
  }

  & > u {
    text-decoration: underline;
  }

  & > mark {
    padding: 0.2rem 0.6rem 0.3rem 0.6rem;
    border-radius: 0.3rem;
    background-color: ${Colors.tealLighter};
    color: ${Colors.text};
  }
`;
