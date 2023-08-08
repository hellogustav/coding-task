import styled from 'styled-components';

import { Colors } from 'components/utils/styles/ui';
import { Button as ButtonBase } from 'components/elements/button';

export const PaginationWrapper = styled.div`
  margin: 3rem;
`;

export const TableWrapper = styled.div`
  margin: 3rem;
  border: 1px solid ${Colors.grey};
  border-radius: 0.6rem;
  min-width: 81.35rem;
`;

export const TeamsCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`;

export const TeamsButton = styled(ButtonBase).attrs({
  type: 'outline',
  color: 'tealDark',
})`
  background: ${Colors.tealLighter};
  margin-left: 1rem;
`;
