import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isValid } from 'components/utils/form-utils';

import * as styled from './styles/radiobutton';

export class SimpleRadiobutton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
    };
  }

  render() {
    const {
      className,
      id,
      checked,
      value,
      shouldValidate,
      onChange,
      name,
      label = {},
      disabled,
    } = this.props;

    const {
      includeIndicator = false,
      label: desc,
      required,
      labelBreakline,
      highlight,
    } = label;

    const { focused } = this.state;

    const labelComponent = !desc ? null : (
      <styled.FormLabel
        includeIndicator={includeIndicator}
        value={desc}
        highlight={highlight}
        labelBreakline={labelBreakline}
        required={required}
      />
    );

    return (
      <styled.RadioContainer
        className={className}
        labelBreakline={labelBreakline}
        onClick={() => onChange(id)}
      >
        <styled.Radiobutton
          checked={checked}
          focused={focused}
          disabled={disabled}
          isValid={isValid({ inputValue: checked, shouldValidate })}
        >
          <styled.RadioInput
            id={id}
            type="radio"
            checked={checked}
            value={value}
            name={name}
            disabled={disabled}
            onChange={() => onChange(id)}
            onFocus={() => this.setState({ focused: true })}
            onBlur={() => this.setState({ focused: false })}
            onClick={(event) => event.stopPropagation()}
          />

          {checked && <styled.RadioChecked />}
        </styled.Radiobutton>

        {labelComponent}
      </styled.RadioContainer>
    );
  }
}

SimpleRadiobutton.propTypes = {
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.object,
  value: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  shouldValidate: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
