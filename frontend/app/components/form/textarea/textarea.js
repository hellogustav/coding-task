import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import { isEmpty, isString, reduce } from 'lodash';

import { ValidationErrorIndicator } from 'components/form/validationErrorIndicator';

import i18n from './utils/i18n';
import * as styled from './styles/textarea';

import { isValid } from '../../utils/form-utils';

class TextareaComponent extends Component {
  componentDidMount() {
    const { value, autoheight } = this.props;

    if (value && autoheight) this.setHeight(value);
  }

  shouldComponentUpdate(nextProps) {
    const nextVals = this.getPropertiesToCompareFor(nextProps);
    const oldVals = this.getPropertiesToCompareFor(this.props);

    return reduce(
      nextVals,
      (updateComponent, val, key) =>
        updateComponent || nextVals[key] !== oldVals[key],
      false
    );
  }

  componentDidUpdate(prevProps) {
    const { autoheight, value } = this.props;

    if (!this.inputRef || prevProps.value === value) return;

    if (autoheight) this.setHeight(value);
  }

  getPropertiesToCompareFor(propsToExtract) {
    const {
      placeholder,
      value,
      height,
      shouldValidate,
      disabled,
    } = propsToExtract;

    return {
      placeholder,
      value,
      height,
      shouldValidate,
      disabled,
    };
  }

  setHeight = (value) => {
    if (!value) {
      this.inputRef.style.height = null;
      return;
    }

    this.inputRef.style.height = `${this.inputRef.scrollHeight}px`;
  };

  updateValue(value) {
    const { onChange, autoheight } = this.props;

    if (autoheight && this.inputRef) {
      this.setHeight(value);
    }
    onChange(value);
  }

  render() {
    const {
      className,
      intl,
      shouldValidate,
      required,
      inputType,
      value,
      placeholder = {},
      height,
      autoheight,
      maxlength = null,
      rows,
      showCharactersCounter,
      onKeyDown,
      onKeyPress,
      disabled,
      autoFocus,
      onInnerRef = () => {},
      maxHeight,
    } = this.props;

    const showCharactersCounterIntlValues = {
      currentCount: String(value.length),
      maxCharacters: maxlength,
    };

    let placeholderText = '';

    if (!isEmpty(placeholder)) {
      placeholderText = isString(placeholder)
        ? placeholder
        : intl.formatMessage(placeholder);
    }

    const isInputValid = isValid({
      inputValue: value,
      shouldValidate,
      inputType,
      required,
    });

    return (
      <styled.Wrapper>
        {shouldValidate && !isInputValid && (
          <ValidationErrorIndicator inputType="textarea" />
        )}
        <styled.Textarea
          className={className}
          placeholder={placeholderText}
          height={height}
          maxLength={maxlength}
          autoheight={autoheight}
          rows={rows}
          value={value}
          isValid={isInputValid}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          disabled={disabled}
          onChange={(event) => this.updateValue(event.target.value)}
          autoFocus={autoFocus}
          maxHeight={maxHeight}
          ref={(node) => {
            this.inputRef = node;
            onInnerRef(node);
          }}
        />

        {showCharactersCounter && (
          <styled.CharactersCounter>
            <FormattedMessage
              {...i18n.charactersCounter}
              values={showCharactersCounterIntlValues}
            />
          </styled.CharactersCounter>
        )}
      </styled.Wrapper>
    );
  }
}

TextareaComponent.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  disabled: PropTypes.bool,
  value: PropTypes.string,
  height: PropTypes.string,
  required: PropTypes.bool,
  maxlength: PropTypes.number,
  rows: PropTypes.number,
  showCharactersCounter: PropTypes.bool,
  autoheight: PropTypes.bool,
  inputType: PropTypes.string,
  shouldValidate: PropTypes.bool,
  intl: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  autoFocus: PropTypes.bool,
  onInnerRef: PropTypes.func,
  maxHeight: PropTypes.string,
};

export const Textarea = injectIntl(TextareaComponent);
