import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isBoolean } from 'lodash';

import { isValid } from 'components/utils/form-utils';
import { Colors } from 'components/utils/styles/ui';
import { Icon } from 'components/elements/icon';
import { ValidationErrorIndicator } from 'components/form/validationErrorIndicator';

import * as styled from './styles/checkbox';

export class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
    };
  }

  updateChecked() {
    const { id, checked, disabled, onChange } = this.props;

    if (!disabled) {
      onChange({ id, checked: !checked });
      this.setState({ focused: false });
    }
  }

  render() {
    const {
      id,
      shouldValidate,
      inputType,
      required,
      checked,
      disabled,
      isCheckboxListValid,
      className,
    } = this.props;
    const { focused } = this.state;

    const isCheckboxValid = isBoolean(isCheckboxListValid)
      ? isCheckboxListValid
      : isValid({ inputValue: checked, shouldValidate, inputType, required });

    const checkedIcon = checked ? (
      <Icon
        icon="Check"
        size="large"
        color={checked && disabled ? Colors.textLighter : Colors.white}
      />
    ) : null;

    return (
      <styled.Checkbox
        checked={checked}
        disabled={disabled}
        focused={focused}
        isValid={isCheckboxValid}
        className={className}
        onClick={() => this.updateChecked()}
      >
        {shouldValidate && !isCheckboxValid && (
          <ValidationErrorIndicator inputType="checkbox" />
        )}

        <styled.CheckboxInput
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={() => this.updateChecked()}
          onFocus={() => this.setState({ focused: true })}
          onBlur={() => this.setState({ focused: false })}
        />
        <span>{checkedIcon}</span>
      </styled.Checkbox>
    );
  }
}

Checkbox.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  shouldValidate: PropTypes.bool,
  isCheckboxListValid: PropTypes.bool,
  inputType: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
