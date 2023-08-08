import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { isEmpty, isString, reduce } from 'lodash';

import { Colors } from 'components/utils/styles/ui';
import { Icon } from 'components/elements/icon';
import { ValidationErrorIndicator } from 'components/form/validationErrorIndicator';

import { isValid as isFieldValid } from 'components/utils/form-utils';
import { isEmptyString } from 'components/utils/text';

import * as styled from './styles/inputs';

/* eslint react/no-did-update-set-state: 0 */
class InputTextComponent extends Component {
  constructor(props) {
    super(props);

    const isPassword = props.inputType === 'password';
    const inputType = isPassword ? 'password' : 'text';

    this.state = {
      inputType,
      isPassword,
      inputIconPwd: 'EyeSlash',
    };

    this.togglePassword = this.togglePassword.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const nextVals = this.getPropertiesToCompareFor(nextProps);
    const oldVals = this.getPropertiesToCompareFor(this.props);

    const nextStateVals = this.getPropertiesForState(nextState);
    const oldStateVals = this.getPropertiesForState(this.state);

    const updateProps = reduce(
      nextVals,
      (updateComponent, val, key) =>
        updateComponent || nextVals[key] !== oldVals[key],
      false
    );

    const updateState = reduce(
      nextStateVals,
      (updateComponent, val, key) =>
        updateComponent || nextStateVals[key] !== oldStateVals[key],
      false
    );

    return updateProps || updateState;
  }

  getPropertiesToCompareFor(propsToExtract) {
    const {
      value,
      placeholder,
      disabled,
      readonly,
      shouldValidate,
      isValid,
    } = propsToExtract;

    return {
      value,
      placeholder,
      disabled,
      readonly,
      shouldValidate,
      isValid,
    };
  }

  getPropertiesForState(state) {
    const { inputType, isPassword, inputIconPwd } = state;

    return {
      inputType,
      isPassword,
      inputIconPwd,
    };
  }

  clearValue = () => {
    const { onClear } = this.props;

    onClear();
  };

  updateValue(event) {
    const { onChange, value } = this.props;
    const val = this.processedValue(value, event.target.value);

    onChange(val);
  }

  togglePassword() {
    const { inputType, inputIconPwd } = this.state;

    const pwdInputType = inputType === 'password' ? 'text' : 'password';
    const iconPwd = inputIconPwd === 'EyeSlash' ? 'Eye' : 'EyeSlash';

    this.setState({
      inputType: pwdInputType,
      inputIconPwd: iconPwd,
    });
  }

  includeTogglePassword() {
    const { isPassword, inputIconPwd } = this.state;

    return isPassword ? (
      <styled.PwdIcon onClick={this.togglePassword}>
        <Icon icon={inputIconPwd} size="large" color={Colors.text} />
      </styled.PwdIcon>
    ) : null;
  }

  processedValue(oldValue, newValue) {
    const { inputType, max } = this.props;

    switch (inputType) {
      case 'number': {
        if (max && parseInt(newValue, 10) > max) {
          return oldValue;
        }
        const val = isString(newValue) ? newValue : newValue.toString();
        return val.replace(/[^0-9.]/g, '');
      }

      case 'ssn_number': {
        const val = isString(newValue) ? newValue : newValue.toString();
        return val.replace(/[^0-9]/g, '').slice(0, 4);
      }

      case 'email': {
        const val = isString(newValue) ? newValue : newValue.toString();
        return val.replace(/\s/g, '');
      }

      case 'link': {
        const val = isString(newValue) ? newValue : newValue.toString();
        return val.replace(/\s/g, '');
      }

      case 'zip_code': {
        const val = isString(newValue) ? newValue : newValue.toString();
        return val.replace(/[^0-9]/g, '').slice(0, 5);
      }

      default:
        return newValue;
    }
  }

  render() {
    const {
      className,
      intl,
      placeholder,
      indicator,
      isValid,
      iconIndicator,
      inputType,
      shouldValidate,
      required,
      value,
      autoFocus = false,
      readonly = false,
      disabled = false,
      min,
      maxlength,
      onInnerRef,
      onKeyUp,
      onKeyPress,
      onFocus,
      onBlur,
      iconPlaceholder,
      dataManual,
      size,
      onClear,
      validationErrorIndicator,
      clearable,
    } = this.props;

    const { inputType: inputTypeToUse } = this.state;

    const placeholderValue = placeholder.id
      ? intl.formatMessage(placeholder)
      : placeholder;

    const placeholderVal =
      isEmpty(placeholderValue) || isEmptyString(placeholderValue)
        ? ''
        : placeholderValue;

    const isInputValid = isValid
      ? isFieldValid({
          inputValue: value,
          inputType,
          shouldValidate,
          required,
          min,
        })
      : isValid;

    const indicatorIconTag = iconIndicator ? (
      <styled.Indicator>
        <Icon icon={iconIndicator} size="large" color={Colors.teal} />
      </styled.Indicator>
    ) : null;

    const indicatorTag = indicator ? (
      <styled.Indicator>{indicator}</styled.Indicator>
    ) : null;

    const placeholderIconTag = iconPlaceholder ? (
      <styled.PlaceholderIcon>
        <Icon icon={iconPlaceholder} color="greyDarker" />
      </styled.PlaceholderIcon>
    ) : null;

    return (
      <styled.InputContainer>
        {shouldValidate && !isInputValid && validationErrorIndicator && (
          <ValidationErrorIndicator />
        )}
        {placeholderIconTag}
        <styled.InputText
          ref={(input) => {
            if (onInnerRef) {
              onInnerRef(input);
            }
          }}
          disabled={disabled}
          maxLength={maxlength}
          readOnly={readonly}
          type={inputTypeToUse}
          className={className}
          value={value}
          placeholder={placeholderVal}
          isValid={isInputValid}
          hasPlaceholderIcon={iconPlaceholder}
          rightIndicator={indicator || iconIndicator}
          onChange={(event) => this.updateValue(event)}
          onKeyUp={onKeyUp}
          onKeyPress={onKeyPress}
          onFocus={onFocus}
          onBlur={onBlur}
          autoFocus={autoFocus}
          data-manual={dataManual}
          size={size}
        />
        {((Boolean(onClear) && !isEmpty(value)) || clearable) && (
          <styled.AutocompleteClear>
            <Icon icon="X" color="textLighter" onClick={this.clearValue} />
          </styled.AutocompleteClear>
        )}
        {this.includeTogglePassword()}
        {indicatorTag}
        {indicatorIconTag}
      </styled.InputContainer>
    );
  }
}

/* eslint react/no-unknown-property:0 */
InputTextComponent.propTypes = {
  className: PropTypes.string,
  indicator: PropTypes.string,
  iconIndicator: PropTypes.string,
  iconPlaceholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readonly: PropTypes.bool,
  maxlength: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  autoFocus: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  inputType: PropTypes.string,
  size: PropTypes.oneOf(['small', 'default']),
  isValid: PropTypes.bool,
  shouldValidate: PropTypes.bool,
  intl: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
  onKeyPress: PropTypes.func,
  onInnerRef: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  dataManual: PropTypes.string,
  onClear: PropTypes.func,
  validationErrorIndicator: PropTypes.bool,
  clearable: PropTypes.bool,
};

InputTextComponent.defaultProps = {
  isValid: true,
  maxlength: 255,
};

export const InputText = injectIntl(InputTextComponent);
