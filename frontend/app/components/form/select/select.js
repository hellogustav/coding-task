import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  isFinite,
  isFunction,
  isArray,
  isNil,
  reduce,
  noop,
  isEmpty,
} from 'lodash';

import { Icon } from 'components/elements/icon';
import { Tooltip } from 'components/overlay/Tooltip';
import { ValidationErrorIndicator } from 'components/form/validationErrorIndicator';
import { toFormattedMessage } from 'components/utils/text';
import { TagEl } from 'components/navigation/menu/link';

import * as styled from './styles/select';
import i18n from './utils/i18n';

import { isValid } from '../../utils/form-utils';

class SelectComponent extends Component {
  static getDerivedStateFromProps(props, state) {
    if (!isFunction(props.optionsFn) && props.options !== state.options) {
      return { options: props.options };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      options: props.options,
      optionsPosition: props.optionsPosition,
    };
  }

  componentDidMount() {
    this.fetchOptions();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const nextVals = this.getPropertiesToCompareFor(nextProps, nextState);
    const oldVals = this.getPropertiesToCompareFor(this.props, this.state);

    return reduce(
      nextVals,
      (updateComponent, val, key) =>
        updateComponent || nextVals[key] !== oldVals[key],
      false
    );
  }

  handleFocus(focused) {
    const { onFocus } = this.props;
    const onFocusCallback = onFocus || noop;
    this.setState({ focused }, onFocusCallback);
  }

  getPropertiesToCompareFor(propsToExtract, stateToExtract) {
    const { selected, disabled, shouldValidate } = propsToExtract;
    const { focused, options, optionsPosition } = stateToExtract;

    return {
      selected,
      options,
      disabled,
      focused,
      shouldValidate,
      optionsPosition,
    };
  }

  fetchOptions = (filter) => {
    const { optionsFn } = this.props;

    if (isFunction(optionsFn)) {
      optionsFn(filter).then((options) => {
        this.setState({ options });
      });
    }
  };

  handleOptionsPosition = (optionsPosition) => {
    this.setState({ optionsPosition });
  };

  updateValue(selected) {
    const { onChange } = this.props;
    onChange(selected);
  }

  equalSlugs(first, second) {
    const firstSlug = isFinite(first) ? first.toString() : first;
    const secondSlug = isFinite(second) ? second.toString() : second;
    return firstSlug === secondSlug;
  }

  optionsWithoutSelected() {
    const { selected } = this.props;
    const { options } = this.state;
    return options.filter((option) => !this.equalSlugs(selected, option.slug));
  }

  renderSelection(selectedOption, displayedSelection) {
    const { intl, selected, selectionSource } = this.props;
    const {
      linkName,
      selectedName,
      values,
      icon,
      iconSize,
      tags,
    } = displayedSelection;
    const optionName = toFormattedMessage(
      selectedName || linkName,
      intl,
      values
    );

    const selectionArchived =
      !isEmpty(selected) && selected !== 'none' && !selectedOption;

    if (selectionArchived && selectionSource === 'bullhorn') {
      return (
        <styled.ArchivedSelection>
          <Tooltip
            size="23rem"
            fixed
            content={<FormattedMessage {...i18n.bullhornOptionTooltip} />}
          >
            <styled.NarrowVerticalboxIcon>
              <Icon icon="Bullhorn" color="bhOrange" size="larger" />
            </styled.NarrowVerticalboxIcon>
          </Tooltip>
          <styled.OptionName>{selected}</styled.OptionName>
        </styled.ArchivedSelection>
      );
    }

    if (selectionArchived) {
      return (
        <styled.ArchivedSelection>
          <Tooltip
            size="23rem"
            fixed
            content={<FormattedMessage {...i18n.archivedOptionTooltip} />}
          >
            <styled.NarrowVerticalboxIcon>
              <Icon icon="WarningCircle" color="red" size="larger" />
            </styled.NarrowVerticalboxIcon>
          </Tooltip>
          <styled.OptionName>{selected}</styled.OptionName>
        </styled.ArchivedSelection>
      );
    }

    return (
      <styled.Selected>
        {icon && (
          <styled.NarrowVerticalboxIcon>
            <Icon icon={icon} size={iconSize || 'larger'} />
          </styled.NarrowVerticalboxIcon>
        )}
        <styled.OptionName>{optionName}</styled.OptionName>
        {isArray(tags) && tags.map((tag) => TagEl(tag, true, intl))}
      </styled.Selected>
    );
  }

  render() {
    const {
      className,
      inputType,
      optionsFn,
      required,
      shouldValidate = false,
      selected,
      disabled,
      listWithoutSelected = false,
      listWithoutPlaceholder = false,
      selectTag,
      size,
      placeholder,
      optionsHeight,
      optionsPosition: defaultOptionsPosition,
      optionsTypeahead,
      dataManual,
    } = this.props;
    const { options, focused: stateFocus, optionsPosition } = this.state;

    const selectedOption =
      isNil(selected) && !listWithoutPlaceholder
        ? options[0]
        : options.filter((option) => this.equalSlugs(selected, option.slug))[0];
    const displayedSelection = selectedOption ||
      (!listWithoutPlaceholder && options[0]) ||
      (!isEmpty(placeholder) && placeholder) || { linkName: '', slug: 'none' };
    const { slug } = displayedSelection;

    const displayedOptions = listWithoutSelected
      ? this.optionsWithoutSelected()
      : options;

    const isInputValid = isValid({
      inputValue: slug,
      shouldValidate,
      inputType: 'option',
      required,
    });

    const displayClear =
      (!inputType || inputType === 'option') &&
      selectedOption &&
      selectedOption.slug !== 'none' &&
      !isNil(selectedOption.slug) &&
      !isEmpty(placeholder);

    return (
      <styled.Select
        className={className}
        inputType={inputType}
        isValid={isInputValid}
        options={displayedOptions}
        disabled={disabled}
        onSelect={(newSelected) => this.updateValue(newSelected)}
        onFocus={(focused) => this.handleFocus(focused)}
        selectTag={selectTag}
        focused={stateFocus}
        size={size}
        optionsHeight={optionsHeight}
        listWithoutPlaceholder={listWithoutPlaceholder}
        typeahead={isFunction(optionsFn)}
        typeaheadPlaceholder={optionsTypeahead}
        onTypeaheadChange={this.fetchOptions}
        optionsPosition={optionsPosition}
        defaultOptionsPosition={defaultOptionsPosition}
        onOptionsPosition={this.handleOptionsPosition}
        displayClear={displayClear}
        dataManual={dataManual}
        active={selected}
      >
        {shouldValidate && !isInputValid && <ValidationErrorIndicator />}

        {this.renderSelection(selectedOption, displayedSelection)}
      </styled.Select>
    );
  }
}

SelectComponent.propTypes = {
  intl: PropTypes.object,
  className: PropTypes.string,
  inputType: PropTypes.oneOf(['option', 'currency']),
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectionSource: PropTypes.string,
  options: PropTypes.array,
  optionsFn: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  shouldValidate: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  listWithoutSelected: PropTypes.bool,
  listWithoutPlaceholder: PropTypes.bool,
  selectTag: PropTypes.string,
  size: PropTypes.oneOf(['small', 'default']),
  optionsHeight: PropTypes.number,
  optionsPosition: PropTypes.oneOf(['top', 'bottom']),
  optionsTypeahead: PropTypes.object,
  placeholder: PropTypes.object,
  onFocus: PropTypes.func,
  dataManual: PropTypes.string,
};

SelectComponent.defaultProps = {
  options: [],
  selectTag: 'link',
  size: 'default',
  optionsPosition: 'bottom',
  listWithoutPlaceholder: false,
};

export const Select = injectIntl(SelectComponent);
