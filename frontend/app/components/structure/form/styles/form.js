import styled, { css } from 'styled-components';

import { Button as ButtonBase } from 'components/elements/button';
import { Submit as SubmitBase } from 'components/form/submit/submit';

import { Fieldset as FieldsetBase } from 'components/form/fieldset/fieldset';
import { PasswordFieldset as PasswordFieldsetBase } from 'components/form/fieldset/password';
import { CheckboxFieldset as CheckboxFieldsetBase } from 'components/form/fieldset/checkbox';
import { RadioFieldset as RadioFieldsetBase } from 'components/form/fieldset/radio';
import { FormLabel as FormLabelBase } from 'components/form/label/label';

import { Textarea } from 'components/form/textarea/styles/textarea';
import { CheckboxLabel, Label } from 'components/form/label/styles/label';
import { Colors, materialShadow } from 'components/utils/styles/ui';

import {
  Flexbox,
  GrayContainer,
} from 'components/structure/page/styles/containers';

const withFullWidthLabelSupport = css`
  & > label {
    ${({ fullWidth, fullWidthLabel }) =>
      !fullWidth && fullWidthLabel ? 'width: 200%;' : null}
  }
`;

export const WhiteContainer = styled(GrayContainer)`
  background-color: ${Colors.white};
  max-width: 100%;
`;

export const EmptyContainer = styled.div``;

export const Form = styled.form`
  background-color: ${Colors.white};
  border-radius: 0.3rem;
  padding: 3rem 4rem;
  width: 100%;
  ${({ isSimple }) =>
    isSimple
      ? `border: .1rem solid ${Colors.outline};`
      : `box-shadow: ${materialShadow};`}
`;

export const Multiple = styled(Flexbox)`
  align-items: center;
  justify-content: flex-start;
  margin: ${({ margin = 0 }) => margin};
`;

export const BlockTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 3rem;
`;

export const BlockSubTitle = styled.h4`
  font-size: 2rem;
  font-weight: 400;
  margin: 1rem 0 2rem;
`;

export const BlockSecondarySubtitle = styled.h4`
  margin: 1rem 0 2rem;
`;

export const Fieldset = styled(FieldsetBase)`
  margin-bottom: ${({ marginBottom = '3rem' }) => marginBottom};
  margin-left: ${({ atRight }) => (atRight ? '4.6rem' : 0)};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'calc(50% - 2.3rem)')};

  &:only-child {
    margin-left: 0;
  }

  ${withFullWidthLabelSupport}
`;

export const PasswordFieldset = styled(PasswordFieldsetBase)`
  margin-bottom: ${({ marginBottom = '3rem' }) => marginBottom};
  margin-left: ${({ atRight }) => (atRight ? '4.6rem' : 0)};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'calc(50% - 2.3rem)')};

  &:only-child {
    margin-left: 0;
  }

  ${withFullWidthLabelSupport}
`;

export const TextareaFieldset = styled(Fieldset)`
  margin: 0 0 3rem;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'calc(50% - 2.3rem)')};

  ${Textarea} {
    height: 17rem;
  }

  ${withFullWidthLabelSupport}
`;

export const CheckboxFieldset = styled(CheckboxFieldsetBase)`
  cursor: pointer;
  margin-top: ${({ inputDescriptionMargin }) =>
    inputDescriptionMargin ? '2.3rem' : 0};
  margin-left: ${({ atRight }) => (atRight ? '4.6rem' : 0)};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'calc(50% - 2.3rem)')};

  ${CheckboxLabel} {
    ${({ theme }) => theme.typography.text.normal};
  }

  ${withFullWidthLabelSupport}
`;

export const Button = styled(ButtonBase)`
  height: ${({ height = '4rem' }) => height};
  margin: ${({ margin = '0' }) => margin};
  width: ${({ width = 'auto' }) => width};
`;

export const Description = styled.p`
  color: ${({ highlight, theme }) =>
    highlight ? theme.colors.primary : Colors.text};
  font-size: ${({ small = false }) => (small ? '1.4rem' : '1.6rem')};
  font-weight: 400;
  margin: ${({ margin = '0 0 .8rem' }) => margin};
`;

export const SecondaryLabel = styled.p`
  color: ${Colors.textLighter};
  margin: ${({ margin = '0 0 .8rem' }) => margin};
`;

export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 0.9rem;
`;

export const Container = styled(Flexbox)`
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  justify-content: ${({ right }) => (right ? 'flex-end' : 'flex-start')};
`;

export const ColContainer = styled(Container)`
  align-items: flex-start;
  flex-direction: column;
  margin-left: ${({ atRight }) => (atRight ? '4.6rem' : 0)};
  height: ${({ height = 'auto' }) => height};
  width: calc(50% - 2.3rem);

  label {
    text-align: ${({ labelAlignment = 'left' }) => labelAlignment};
  }
`;

export const Col = styled.div`
  width: 100%;
`;

export const Submit = styled(SubmitBase)`
  height: 4rem;
`;

export const SubLabel = styled(Label)`
  ${({ theme }) => theme.typography.text.small};
`;

export const FormLabel = styled(FormLabelBase)``;

export const TooltipIcon = styled.div`
  margin-left: 1rem;
`;

export const Card = styled(Form)`
  & + & {
    margin-top: 3rem;
  }
  padding-bottom: ${({ bottomPadding }) => (bottomPadding ? '3rem' : 0)};
  ${({ padding }) => padding && `padding: ${padding};`};
`;

export const CardTitle = styled.div`
  color: ${Colors.tealDark};
  font-size: 2.2rem;
  margin-bottom: 3rem;
  font-weight: 500;
  line-height: 1.45;
`;

export const CardSubtitle = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  font-weight: 400;
  margin: 3.3rem 0 2.1rem;
  display: flex;
  align-items: center;

  & * {
    flex-shrink: 0;
  }
`;

export const CardDescription = styled(Description)`
  margin: 0 0 3rem 0;
  letter-spacing: 0.07rem;
`;

export const CardNote = styled(Description).attrs({ small: true })`
  font-size: 1.3rem;
  padding-top: 0.5rem;
`;

export const CardsContainer = styled(Flexbox)`
  flex-wrap: wrap;
`;

export const SubmitContainer = styled(Container)`
  margin-top: 3rem;
  margin-bottom: 0.3rem;
  & > * {
    margin-left: 1.6rem;
  }
`;

export const Banner = styled(Card)`
  border-left: 0.5rem solid ${Colors.tealDark};
  margin-bottom: 2.4rem;
  padding: 3rem 4rem;
  line-height: 1.5;

  & > a {
    color: ${Colors.tealDark};
    text-decoration: underline;
  }
`;

export const BannerTitle = styled.h2`
  color: ${Colors.tealDark};
  margin-top: 0;
  display: flex;
  font-size: 2.2rem;
`;

export const BannerIcon = styled.div`
  flex-grow: 0;
  margin-right: 0.4rem;

  & svg {
    width: 2.4rem;
    margin-right: 1rem;
  }

  & svg + svg {
    width: 2rem;
    margin-left: -1.5rem;
    margin-right: 1rem;
  }
`;
