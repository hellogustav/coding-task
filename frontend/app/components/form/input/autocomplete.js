import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { isObject, isEmpty, isArray, escapeRegExp } from 'lodash';
import { ReactPageClick } from 'react-page-click';
import cuid from 'cuid';

import { Icon } from 'components/elements/icon';
import { ValidationErrorIndicator } from 'components/form/validationErrorIndicator';
import { isValid as isFieldValid } from 'components/utils/form-utils';
import { KEYS } from 'components/utils/keys';
import { getDropdownOptionsSettings } from 'components/utils/dropdown';

import * as styled from './styles/inputs';

const BORDER_HEIGHT = 0.4;

/* eslint react/no-did-update-set-state:0 react/no-danger:0 */
class InputAutocompleteComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typedValue: isArray(props.value) ? '' : props.value,
      options: [],
      selected: null,
      optionsPosition: 'bottom',
      optionsVisible: false,
    };
    this.token = cuid();
    this.selectRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { value, clearOnEmpty } = this.props;
    if (isEmpty(prevProps.value) && !isEmpty(value) && !isArray(value)) {
      this.setState({ typedValue: value });
    }
    if (clearOnEmpty && !isEmpty(prevProps.value) && isEmpty(value)) {
      this.setState({ typedValue: '' });
    }
  }

  handleKeyUp(event) {
    const { options, selected } = this.state;

    switch (event.keyCode) {
      case KEYS.ENTER: {
        if (selected != null) {
          this.selectValue(event, options[selected]);
        }
        break;
      }
      case KEYS.UP_ARROW: {
        const current = selected === null ? options.length : selected;
        const index = (options.length + current - 1) % options.length;

        this.setState({ selected: index });
        break;
      }
      case KEYS.DOWN_ARROW: {
        const current = selected === null ? -1 : selected;
        const index = (current + 1) % options.length;

        this.setState({ selected: index });
        break;
      }
      default:
        break;
    }
  }

  handleKeyPress(event) {
    const { allowEmpty, onChange } = this.props;
    const { typedValue } = this.state;

    if (event.nativeEvent.keyCode === KEYS.ENTER) {
      event.preventDefault();
      event.stopPropagation();

      if (allowEmpty && isEmpty(typedValue)) {
        this.setState({ options: [], selected: null });
        onChange(null);
      }
    }
  }

  getOptionsSettings = (options, isOpen) => {
    const {
      optionsHeight,
      dropdownFooterHeight,
      maxOptionsHeight,
    } = this.props;
    const { optionsPosition } = this.state;

    const { position, height } = getDropdownOptionsSettings({
      element: this.selectRef.current,
      options,
      optionsHeight,
      maxOptionsHeight,
      extraContentHeight: dropdownFooterHeight,
      borderHeight: BORDER_HEIGHT,
    });

    return {
      optionsPosition: isOpen ? optionsPosition : position,
      optionsHeight: height,
    };
  };

  updateValue(event) {
    const {
      minlength,
      onAutocomplete,
      onChange,
      allowEmpty,
      freetext,
      value: currentValue,
    } = this.props;
    const { value } = event.target;

    if (!allowEmpty && currentValue) {
      onChange(null);
    }

    this.setState({ typedValue: value });

    if (value.length >= minlength) {
      onAutocomplete(value, this.token).then((options) => {
        const nextOptions = freetext
          ? [{ value, label: value }, ...options]
          : options;

        this.setState(({ optionsVisible }) => {
          const optSet = this.getOptionsSettings(nextOptions, optionsVisible);

          return {
            options: nextOptions,
            selected: null,
            optionsVisible: true,
            ...optSet,
          };
        });
      });
      return;
    }

    this.setState({
      options: [],
      selected: null,
      optionsVisible: false,
    });
  }

  clearValue() {
    const { onChange } = this.props;

    this.setState({ typedValue: '', options: [], selected: null });
    onChange(null);
  }

  selectValue(event, option) {
    const { onChange, clearOnChange } = this.props;
    const typedValue = clearOnChange ? '' : option.label;

    event.preventDefault();
    this.setState({ typedValue, options: [], selected: null });
    onChange(option.value);
  }

  renderOptions() {
    const {
      dropdownFooter,
      inputIcon,
      highlight,
      maxOptionsHeight,
      dropdownFooterHeight,
    } = this.props;
    const {
      typedValue,
      options,
      selected,
      optionsPosition,
      optionsHeight,
    } = this.state;
    const r = new RegExp(`^(${escapeRegExp(typedValue)})`, 'i');

    const maxTotalHeight =
      maxOptionsHeight + dropdownFooterHeight + BORDER_HEIGHT;
    return (
      <styled.AutocompleteOptions
        optionsPosition={optionsPosition}
        height={optionsHeight}
        maxOptionsHeight={maxTotalHeight}
      >
        {options.map((option, i) => (
          <styled.AutocompleteOption
            key={`option-${option.label}`}
            onClick={(e) => this.selectValue(e, option)}
            active={selected === i}
          >
            <span>
              {inputIcon && (
                <styled.AutocompleteIcon icon={inputIcon} color="greyDark" />
              )}
              {highlight ? (
                <styled.Highlight
                  dangerouslySetInnerHTML={{
                    __html: option.label.replace(r, '<mark>$1</mark>'),
                  }}
                />
              ) : (
                option.label
              )}
            </span>
          </styled.AutocompleteOption>
        ))}
        {dropdownFooter}
      </styled.AutocompleteOptions>
    );
  }

  render() {
    const {
      intl,
      className,
      value,
      required,
      inputType,
      placeholder,
      iconPlaceholder,
      isValid,
      shouldValidate,
      disabled,
      maxlength,
      dataManual,
    } = this.props;
    const { options, typedValue } = this.state;

    const placeholderValue =
      (isObject(placeholder) && intl.formatMessage(placeholder)) ||
      placeholder ||
      '';
    const isInputValid = isValid
      ? isFieldValid({ inputValue: value, inputType, shouldValidate, required })
      : isValid;

    const placeholderIconTag = iconPlaceholder ? (
      <styled.PlaceholderIcon>
        <Icon icon={iconPlaceholder} color="greyDarker" />
      </styled.PlaceholderIcon>
    ) : null;

    return (
      <ReactPageClick notify={() => this.setState({ options: [] })}>
        <styled.InputContainer>
          {shouldValidate && !isInputValid && <ValidationErrorIndicator />}
          {placeholderIconTag}
          <styled.InputText
            ref={this.selectRef}
            className={className}
            value={typedValue}
            placeholder={placeholderValue}
            disabled={disabled}
            maxLength={maxlength}
            isValid={isInputValid}
            hasPlaceholderIcon={iconPlaceholder}
            onChange={(event) => this.updateValue(event)}
            onKeyUp={(event) => this.handleKeyUp(event)}
            onKeyPress={(event) => this.handleKeyPress(event)}
            data-manual={dataManual}
            clearable
          />
          {!isEmpty(typedValue) && (
            <styled.AutocompleteClear>
              <Icon
                icon="X"
                color="textLighter"
                onClick={() => this.clearValue()}
              />
            </styled.AutocompleteClear>
          )}
          {options.length > 0 && this.renderOptions()}
        </styled.InputContainer>
      </ReactPageClick>
    );
  }
}

InputAutocompleteComponent.propTypes = {
  intl: intlShape,
  className: PropTypes.string,
  dropdownFooter: PropTypes.node,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  iconPlaceholder: PropTypes.string,
  inputType: PropTypes.string,
  minlength: PropTypes.number,
  maxlength: PropTypes.number,
  freetext: PropTypes.bool,
  isValid: PropTypes.bool,
  shouldValidate: PropTypes.bool,
  inputIcon: PropTypes.string,
  clearOnChange: PropTypes.bool,
  clearOnEmpty: PropTypes.bool,
  allowEmpty: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onAutocomplete: PropTypes.func,
  dataManual: PropTypes.string,
  highlight: PropTypes.bool,
  optionsHeight: PropTypes.number,
  maxOptionsHeight: PropTypes.number,
  dropdownFooterHeight: PropTypes.number,
};

InputAutocompleteComponent.defaultProps = {
  isValid: true,
  clearOnChange: false,
  clearOnEmpty: false,
  allowEmpty: false,
  optionsHeight: 4,
  maxOptionsHeight: 20,
  dropdownFooterHeight: 0,
};

export const InputAutocomplete = injectIntl(InputAutocompleteComponent);
