import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isValid } from 'components/utils/form-utils';

import * as styled from './styles/radiobutton';

export class RichRadiobutton extends Component {
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
      disabled,
      value,
      shouldValidate,
      onChange,
      name,
      label = {},
      description,
    } = this.props;
    const { includeIndicator = false, label: desc, required } = label;
    const { focused } = this.state;

    return (
      <styled.RichContainer
        className={className}
        checked={checked}
        disabled={disabled}
        onClick={() => onChange(id)}
      >
        <div>
          <styled.FormLabel
            includeIndicator={includeIndicator}
            value={desc}
            required={required}
          />
          <styled.Description value={description} includeIndicator={false} />
        </div>

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
      </styled.RichContainer>
    );
  }
}

RichRadiobutton.propTypes = {
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.object,
  description: PropTypes.object,
  value: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  shouldValidate: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
