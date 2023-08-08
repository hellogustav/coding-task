import PropTypes from 'prop-types';
import React from 'react';

import { FormLabel } from '../label/label';
import { Radiobuttons } from '../radiobutton/radiobuttons';

import * as styled from './styles/fieldset';

const formLabel = function formLabel(
  context,
  includeIndicator,
  tooltipContent,
  children
) {
  const { id, label, required } = context;

  const fieldsetLabelMargin = !children ? '0 0 1rem' : '0 0 .8rem';

  return context.label ? (
    <styled.FormLabel
      margin={fieldsetLabelMargin}
      includeIndicator={includeIndicator}
      value={label}
      required={required}
      tooltipContent={tooltipContent}
      elementToRefer={id}
    />
  ) : null;
};

const inputDescriptionLabel = function inputDescriptionLabel(context) {
  const { InputDescriptionComponent: LabelUI, inputDescription } = context;
  return inputDescription ? (
    <FormLabel
      LabelUI={LabelUI || styled.DescriptionLabelUI}
      value={inputDescription}
      required={false}
      includeIndicator={false}
    />
  ) : null;
};

const radioDescription = function radioDescription(children) {
  return children ? (
    <styled.RadioDescription>{children}</styled.RadioDescription>
  ) : null;
};

export const RadioFieldset = function RadioFieldset(props) {
  const {
    className,
    includeIndicator,
    tooltipContent,
    radiobuttons,
    context,
    inline,
    children,
    disabled,
    type,
    fn,
  } = props;
  const { options } = context;

  return (
    <styled.Fieldset className={className}>
      {formLabel(context, includeIndicator, tooltipContent, children)}

      {inputDescriptionLabel(context)}

      {radioDescription(children)}

      <Radiobuttons
        inline={inline}
        radiobuttons={radiobuttons}
        context={options}
        shouldValidate={false}
        disabled={disabled}
        type={type}
        onChange={(value) => fn(value)}
      />
    </styled.Fieldset>
  );
};

RadioFieldset.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  context: PropTypes.object,
  radiobuttons: PropTypes.array,
  includeIndicator: PropTypes.bool,
  tooltipContent: PropTypes.string,
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['simple', 'rich']),
  fn: PropTypes.func.isRequired,
};

RadioFieldset.defaultProps = {
  includeIndicator: true,
  inline: true,
  disabled: false,
  context: {},
  radiobuttons: [],
  type: 'simple',
};
