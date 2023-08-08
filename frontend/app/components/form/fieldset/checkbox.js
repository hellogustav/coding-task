import React from 'react';
import PropTypes from 'prop-types';

import { inputFor } from './utils/inputTypeFor';
import { inputProperties } from './utils/inputPropertiesForFieldset';
import * as styled from './styles/fieldset';

import { FormLabel } from '../label/label';
import { CheckboxLabel } from '../label/styles/label';

export const CheckboxFieldset = function CheckboxFieldset({
  className,
  LabelComponent: LabelUI = CheckboxLabel,
  includeIndicator = true,
  ...props
}) {
  const input = inputProperties(props);
  const checkbox = inputFor(input);

  const components = (
    <styled.Container>
      {checkbox}
      <FormLabel
        LabelUI={LabelUI}
        includeIndicator={includeIndicator}
        value={input.label}
        required={input.required}
        elementToRefer={input.id}
      />
    </styled.Container>
  );

  return <styled.Fieldset className={className}>{components}</styled.Fieldset>;
};

CheckboxFieldset.propTypes = {
  className: PropTypes.string,
  includeIndicator: PropTypes.bool,
  LabelComponent: PropTypes.func,
  fn: PropTypes.func.isRequired,
};
