import styled from 'styled-components';

import { Colors } from 'components/utils/styles/ui';
import { SideOverlay as OverlayBase } from 'components/structure/SideOverlay';
import { Submit as SubmitBase } from 'components/form/submit/submit';
import {
  Content as OverlayContentBase,
  Footer as OverlayFooterBase,
  ButtonCancel as OverlayButtonCancelBase,
} from 'components/structure/SideOverlay/styles';
import {
  Multiple as MultipleBase,
  Fieldset as FieldsetBase,
} from 'components/structure/form/styles/form';

export const Overlay = OverlayBase;
export const Footer = OverlayFooterBase;
export const ButtonCancel = OverlayButtonCancelBase;

export const Fieldset = styled(FieldsetBase)`
  margin-bottom: 0;
`;

export const Multiple = styled(MultipleBase)`
  margin-top: 0;
  border-top: 1px solid ${Colors.outline};

  ${Fieldset} {
    border-top: none !important;
    padding-top: 2.2rem;
    margin-bottom: 0;
  }

  ${Fieldset} + ${Fieldset} {
    width: 50%;
    margin-left: 2.3rem;
  }
`;

export const Content = styled(OverlayContentBase)`
  ${Fieldset} {
    padding-bottom: 2.2rem;
  }

  ${Fieldset} + ${Fieldset},
  ${Multiple} + ${Fieldset} {
    border-top: 1px solid ${Colors.outline};
    padding: 2.2rem 0;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormTitle = styled.h3`
  margin-top: 0;
  ${({ theme }) => theme.typography.headline.h3}
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const Submit = styled(SubmitBase)``;

export const Title = styled.div`
  font-weight: 500;
  color: ${Colors.text};
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
`;
