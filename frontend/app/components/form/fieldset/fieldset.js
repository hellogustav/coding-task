import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { FormattedMessage } from 'react-intl';

import { inputFor } from './utils/inputTypeFor';
import { inputProperties } from './utils/inputPropertiesForFieldset';
import { labelProperties } from './utils/inputPropertiesForLabel';
import * as styled from './styles/fieldset';

import { FormLabel } from '../label/label';

const formLabel = function formLabel(context) {
  const {
    LabelComponent: LabelUI,
    label,
    required,
    includeIndicator,
    tooltipContent,
    id,
  } = context;
  return context.label ? (
    <FormLabel
      LabelUI={LabelUI}
      value={label}
      required={required}
      includeIndicator={includeIndicator}
      tooltipContent={tooltipContent}
      elementToRefer={id}
      {...labelProperties(context)}
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

export const Fieldset = function Fieldset(props) {
  const {
    LabelComponent,
    InputDescriptionComponent,
    FormFieldComponent,
    className,
    includeIndicator,
    tooltipContent,
    children,
    bottomChildren,
    errorMessage,
    ...otherProps
  } = props;

  const inputProps = inputProperties(otherProps);
  const formFieldComponent = inputFor(inputProps, FormFieldComponent);
  return (
    <styled.Fieldset
      className={className}
      hasErrors={errorMessage}
      shouldValidate={inputProps.shouldValidate}
    >
      {formLabel({
        LabelComponent,
        label: inputProps.label,
        required: inputProps.required,
        includeIndicator,
        tooltipContent,
        id: inputProps.id,
        value: inputProps.inputValue,
        inputType: inputProps.inputType,
      })}

      {inputDescriptionLabel({
        InputDescriptionComponent,
        inputDescription: inputProps.inputDescription,
      })}

      {children}

      {formFieldComponent}

      {bottomChildren}

      {errorMessage && inputProps.shouldValidate && (
        <styled.ValidationError>
          <FormattedMessage {...errorMessage} />
        </styled.ValidationError>
      )}
    </styled.Fieldset>
  );
};

Fieldset.propTypes = {
  className: PropTypes.string,
  readonly: PropTypes.bool,
  includeIndicator: PropTypes.bool,
  tooltipContent: PropTypes.string,

  context: PropTypes.object,
  LabelComponent: PropTypes.func,
  InputDescriptionComponent: PropTypes.func,
  FormFieldComponent: PropTypes.func,

  placeholder: PropTypes.object,
  inputValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    momentPropTypes.momentObj,
    PropTypes.array,
  ]),
  disabled: PropTypes.bool,

  inputIndicator: PropTypes.string,
  inputIconIndicator: PropTypes.string,

  date: momentPropTypes.momentObj,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.array,
  optionsFn: PropTypes.func,

  required: PropTypes.bool,
  shouldValidate: PropTypes.bool,
  errorMessage: PropTypes.object,
  isValid: PropTypes.bool,
  fn: PropTypes.func.isRequired,
  style: PropTypes.object,

  children: PropTypes.node,
  size: PropTypes.string,
  bottomChildren: PropTypes.node,
  customValidation: PropTypes.func,
};
