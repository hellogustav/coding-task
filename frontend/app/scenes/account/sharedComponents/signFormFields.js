import React from 'react';
import PropTypes from 'prop-types';

import * as styled from './styles';

export const SignFormFields = ({
  context,
  email,
  password,
  shouldValidate,
  inputChange,
}) => (
  <styled.FormFields>
    <styled.Fieldset
      fullWidth
      context={context.email}
      inputValue={email}
      shouldValidate={shouldValidate}
      fn={(value) => inputChange('email', value)}
    />
    <styled.Fieldset
      fullWidth
      marginBottom="1rem"
      context={context.password}
      inputValue={password}
      shouldValidate={shouldValidate}
      fn={(value) => inputChange('password', value)}
    />
  </styled.FormFields>
);

SignFormFields.propTypes = {
  context: PropTypes.object.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  shouldValidate: PropTypes.bool,
  inputChange: PropTypes.func.isRequired,
};
