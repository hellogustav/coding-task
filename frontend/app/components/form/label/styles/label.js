import styled from 'styled-components';

import { Colors } from '../../../utils/styles/ui';

export const Label = styled.label`
  color: ${Colors.text};
  display: block;
  margin-bottom: 1rem;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : 0)};
  margin-top: ${(props) => props.marginTop || 0};
  overflow-wrap: anywhere;
  font-weight: 500;

  & > span > mark {
    padding: 0.2rem 0.6rem 0.3rem 0.6rem;
    border-radius: 0.3rem;
    background-color: ${Colors.tealLighter};
    color: ${Colors.text};
  }

  ${({ theme }) => theme.typography.text.medium};
`;

export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 400;
  margin-left: 0.5rem;
`;

export const InputLabel = styled(Label)`
  margin: 0 0.8rem;

  ${({ theme }) => theme.typography.text.normal};
`;

export const CheckboxLabel = styled(Label)`
  margin-bottom: 0;
  margin-left: 1.5rem;
`;

export const RequiredIndicator = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  line-height: 1.6rem;
  margin-left: 0.4rem;
`;

export const OptionalIndicator = styled(RequiredIndicator)`
  margin-left: 1rem;
  ${({ theme }) => theme.typography.text.medium};
`;

export const TooltipIcon = styled.div`
  margin-left: 1rem;
`;
