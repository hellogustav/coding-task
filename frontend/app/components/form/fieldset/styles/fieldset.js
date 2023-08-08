import styled from 'styled-components';

import { Flexbox } from 'components/structure/page/styles/containers';
import { Colors } from 'components/utils/styles/ui';

import { FormLabel as FormLabelBase } from 'components/form/label/label';
import { Label as LabelUIBase } from 'components/form/label/styles/label';

export const Container = styled(Flexbox)`
  align-items: ${({ alignItems = 'center' }) => alignItems};
`;

export const DoubleContainer = styled(Container)`
  & > * {
    flex-grow: 0;
    width: calc(50% - 2.3rem);
  }

  & > :last-child {
    margin-left: 4.6rem;
  }
`;

export const RadioDescription = styled.div`
  margin: 0 0 2.2rem;
`;

export const Fieldset = styled.fieldset`
  border: 0;
  margin: 0;
  width: 100%;
  min-width: 0;
  position: relative;

  ${({ hasErrors, shouldValidate }) =>
    hasErrors &&
    shouldValidate &&
    `input {
        border: 0.1rem solid ${Colors.red};
        background: ${Colors.redLight};
      }
    `}
`;

export const SliderField = styled.div`
  margin: 0;
  padding: 0
  width: 100%;
`;

export const FormLabel = styled(FormLabelBase)`
  margin: ${({ margin = 0 }) => margin};
`;

export const DescriptionLabelUI = styled(LabelUIBase)`
  font-weight: 400;
  overflow-wrap: anywhere;

  ${({ theme }) => theme.typography.text.normal};
`;

export const DescriptionLabel = styled(FormLabelBase)`
  color: ${Colors.greyDarker};
  margin: 1rem 0 1.6rem;

  ${({ theme }) => theme.typography.text.normal};
`;

export const DayMonthSeparator = styled.span`
  font-size: 2.4rem;
  padding: 0 1rem;
  color: ${Colors.greyDark};
`;

export const PasswordStrengthWrapper = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
`;

export const RangeSeparator = styled.div`
  width: 4.6rem;
  flex-shrink: 0;
  text-align: center;
`;

export const ValidationError = styled.div`
  color: ${Colors.textLight};
  margin-top: 0.6rem;
  ${({ theme }) => theme.typography.text.small};
`;
