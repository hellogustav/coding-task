import styled from 'styled-components';

import { Tooltip as TooltipBase } from 'components/overlay/Tooltip';
import { Activator } from 'components/overlay/Tooltip/styles/tooltip';

export const Content = styled.div`
  white-space: pre-wrap;
  overflow-wrap: anywhere !important;
`;

export const Truncate = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Tooltip = styled(TooltipBase)`
  display: ${({ display }) => display || 'block'};

  & ${Activator} {
    padding: 0;
    margin: 0;
  }
`;

export const ClipboardButtonWrapper = styled.span`
  margin-left: 1rem;
`;
