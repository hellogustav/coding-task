import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import { injectIntl } from 'react-intl';

import { Colors } from 'components/utils/styles/ui';
import { Fieldset } from 'components/form/fieldset/fieldset';

import * as styled from './styles/fieldset';
import i18n from './utils/i18n';

export const PasswordFieldsetComponent = function PasswordFieldsetComponent(
  props
) {
  const { onStrengthChange, isValid, intl, ...otherProps } = props;
  const [passwordStrong, setPasswordStrong] = useState(false);

  const handlePasswordStrengthChange = (score) => {
    const valid = !(score === 0 || score === 1);
    onStrengthChange(valid);
    setPasswordStrong(valid);
  };

  const PasswordStrength = useCallback(
    () => (
      <styled.PasswordStrengthWrapper>
        <PasswordStrengthBar
          password={otherProps.inputValue || ''}
          barColors={[
            Colors.grey,
            Colors.red,
            Colors.yellowDark,
            Colors.tealDark,
            Colors.green,
          ]}
          scoreWords={[
            intl.formatMessage(i18n.passwordTooWeak),
            intl.formatMessage(i18n.passwordTooWeak),
            intl.formatMessage(i18n.passwordOkay),
            intl.formatMessage(i18n.passwordGood),
            intl.formatMessage(i18n.passwordStrong),
          ]}
          onChangeScore={handlePasswordStrengthChange}
          minLength={8}
        />
      </styled.PasswordStrengthWrapper>
    ),
    [otherProps.inputValue]
  );

  return (
    <Fieldset
      bottomChildren={<PasswordStrength />}
      isValid={otherProps.shouldValidate ? passwordStrong && isValid : isValid}
      {...otherProps}
    />
  );
};

export const PasswordFieldset = injectIntl(PasswordFieldsetComponent);

PasswordFieldsetComponent.propTypes = {
  ...Fieldset.propTypes,
  onStrengthChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  inputValue: PropTypes.string,
};
