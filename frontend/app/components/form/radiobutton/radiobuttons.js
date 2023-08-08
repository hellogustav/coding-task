import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { map, filter, clone } from 'lodash';

import * as styled from './styles/radiobutton';

import { SimpleRadiobutton } from './simpleRadiobutton';
import { RichRadiobutton } from './richRadiobutton';

export class Radiobuttons extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  setRadiobuttons() {
    const { radiobuttons, type, context, shouldValidate } = this.props;
    const options = clone(context);
    const Radiobutton = type === 'rich' ? RichRadiobutton : SimpleRadiobutton;

    return map(options, (radiobutton, index) => {
      const {
        id,
        value,
        name,
        label,
        description,
        highlight,
        labelBreakline,
      } = radiobutton;

      const existRadio = filter(radiobuttons, (button) => button.id === id);

      const { checked } = existRadio[0] || {};

      return (
        <Radiobutton
          id={id}
          key={`radio-fieldset-${id}-${index}`}
          value={value}
          name={name}
          label={{ label, highlight, labelBreakline }}
          description={description}
          checked={checked}
          shouldValidate={shouldValidate}
          onChange={this.toggle}
        />
      );
    });
  }

  toggle(id) {
    const { disabled, radiobuttons, onChange } = this.props;
    const buttonsState = clone(radiobuttons);

    const nextRadiobuttons = map(buttonsState, (buttonState) => {
      const tempButton = clone(buttonState);
      tempButton.checked = tempButton.id === id;

      return tempButton;
    });

    if (!disabled) {
      onChange(nextRadiobuttons);
    }
  }

  render() {
    const { className, inline, disabled } = this.props;

    return (
      <styled.RadioFieldset
        className={className}
        inline={inline}
        disabled={disabled}
      >
        {this.setRadiobuttons()}
      </styled.RadioFieldset>
    );
  }
}

Radiobuttons.propTypes = {
  className: PropTypes.string,
  inline: PropTypes.bool,
  shouldValidate: PropTypes.bool,
  context: PropTypes.array,
  radiobuttons: PropTypes.array,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['simple', 'rich']),
  onChange: PropTypes.func,
};

Radiobuttons.defaultProps = {
  inline: true,
  disabled: false,
  type: 'simple',
};
