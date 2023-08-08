import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ReactPageClick } from 'react-page-click';
import { FormattedMessage, injectIntl } from 'react-intl';
import { isFunction, escapeRegExp, isEmpty } from 'lodash';

import { getDropdownOptionsSettings } from 'components/utils/dropdown';

import * as styled from './styles/dropdown';

import i18n from './utils/i18n';

// menu max div height
const MAX_OPTIONS_SIZE = 25;

function getTypeaheadHeight(isEnabled, size) {
  if (!isEnabled) return 0;
  if (size === 'small') return 3.5;
  return 4.5;
}

class DropdownComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMenu: false,
      focused: false,
      typeaheadValue: '',
      selectedHighlighted: null,
      hidden: true,
    };

    this.selectRef = React.createRef();
  }

  componentDidUpdate() {
    const { activeMenu, hidden } = this.state;
    if (this.typeaheadInput && activeMenu) {
      this.typeaheadInput.focus();
    }

    if (activeMenu && hidden) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ hidden: false });
    }
  }

  handleTypeaheadChange(value) {
    const { typeaheadValue } = this.state;
    const { onTypeaheadChange } = this.props;

    this.setState({ typeaheadValue: value, selectedHighlighted: null });

    if (typeaheadValue !== value && isFunction(onTypeaheadChange)) {
      onTypeaheadChange(value);
    }
  }

  handleKeyUp(event) {
    const options = this.optionMenuItems().links;
    const { selectedHighlighted } = this.state;

    switch (event.keyCode) {
      case 13: {
        if (selectedHighlighted != null) {
          options[selectedHighlighted].fn(event);
        }
        break;
      }
      case 38: {
        const nextSelectedHighlighted =
          selectedHighlighted === null ? options.length : selectedHighlighted;
        const index =
          (options.length + nextSelectedHighlighted - 1) % options.length;

        this.setState({ selectedHighlighted: index });
        this.optionsMenu.scrollTo(index);
        break;
      }
      case 40: {
        const nextSelectedHighlighted =
          selectedHighlighted === null ? -1 : selectedHighlighted;
        const index = (nextSelectedHighlighted + 1) % options.length;

        this.setState({ selectedHighlighted: index });
        this.optionsMenu.scrollTo(index);
        break;
      }
      default:
        break;
    }
  }

  handleKeyDown(event) {
    const {
      nativeEvent: { keyCode },
    } = event;

    if (keyCode === 38 || keyCode === 40) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  handleKeyPress(event) {
    if (event.nativeEvent.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  handleClearSelection = (event) => {
    this.optionSelected(event, { slug: null });
  };

  recalculateOptionsPosition = () => {
    const { onOptionsPosition, optionsHeight, options, size } = this.props;
    const typeaheadHeight = getTypeaheadHeight(this.typeaheadEnabled(), size);

    const { position } = getDropdownOptionsSettings({
      element: this.selectRef.current,
      options,
      optionsHeight,
      maxOptionsHeight: MAX_OPTIONS_SIZE,
      extraContentHeight: typeaheadHeight,
    });

    onOptionsPosition(position);
  };

  optionSelected(event, optionItem) {
    const { onSelect } = this.props;
    event.preventDefault();
    event.stopPropagation();

    if (onSelect) {
      onSelect(optionItem.slug);
    }

    if (optionItem.fn) {
      optionItem.fn();
    }

    this.setState(
      { selectedHighlighted: null, activeMenu: false, focused: false },
      () => {
        this.handleTypeaheadChange('');
      }
    );
  }

  optionMenuItems() {
    const { options, active } = this.props;
    const { selectedHighlighted, typeaheadValue } = this.state;

    let links = options.map((optionItem) => {
      const item = { ...optionItem };
      item.fn = (event) => this.optionSelected(event, optionItem);

      return item;
    });

    if (this.typeaheadEnabled()) {
      const value = typeaheadValue || '';
      const re = new RegExp(escapeRegExp(value), 'i');

      links = links.filter((optionItem) => {
        const valueToMatch =
          optionItem.textValue ||
          optionItem.linkName.defaultMessage ||
          optionItem.linkName;
        return re.test(valueToMatch);
      });
    }

    return {
      type: 'verticalbox',
      selected: selectedHighlighted,
      active,
      links,
    };
  }

  toggleOption(event) {
    const { activeMenu } = this.state;
    event.preventDefault();
    event.stopPropagation();

    this.recalculateOptionsPosition();

    this.setState({ activeMenu: !activeMenu });
  }

  focusOption(event, focused) {
    const { onFocus } = this.props;

    if (event.type === 'focus' || event.nativeEvent.relatedTarget) {
      this.setState({ focused });
    }

    if (onFocus) {
      onFocus(focused);
    }
  }

  typeaheadEnabled() {
    const { typeahead = true, options } = this.props;
    return typeahead || (options && options.length >= 5);
  }

  renderTypeahead() {
    const { size, intl, typeaheadPlaceholder } = this.props;
    const { typeaheadValue } = this.state;

    const placeholder = typeaheadPlaceholder || i18n.typeahead;

    return (
      <styled.OptionsTypeahead
        size={size}
        placeholder={intl.formatMessage(placeholder)}
        onInnerRef={(input) => {
          this.typeaheadInput = input;
        }}
        value={typeaheadValue}
        shouldValidate={false}
        onChange={(value) => this.handleTypeaheadChange(value)}
        onKeyUp={(event) => this.handleKeyUp(event)}
        onKeyPress={(event) => this.handleKeyPress(event)}
        onFocus={(event) => this.focusOption(event, true)}
        onBlur={(event) => this.focusOption(event, false)}
      />
    );
  }

  render() {
    const {
      className,
      padding = null,
      size,
      children,
      selectTag,
      disabled,
      optionsPosition,
      displayClear,
      dataManual,
      options,
    } = this.props;
    const { activeMenu: stateActiveMenu, focused, hidden } = this.state;

    const activeMenu = !disabled && (stateActiveMenu || focused);

    const iconDirection = activeMenu ? 'CaretUp' : 'CaretDown';

    const SelectedTag =
      selectTag === 'button'
        ? styled.OptionSelectedButton
        : styled.OptionSelectedLink;

    return (
      <ReactPageClick
        notify={() =>
          activeMenu &&
          this.setState(
            { activeMenu: false, focused: false, hidden: true },
            () => {
              this.handleTypeaheadChange('');
            }
          )
        }
      >
        <styled.Select
          className={className}
          ref={this.selectRef}
          data-manual={dataManual}
        >
          {displayClear ? (
            <styled.ClearSelection
              onClick={this.handleClearSelection}
              type="blank"
            >
              <styled.Icon icon="X" />
              <styled.Divider />
            </styled.ClearSelection>
          ) : null}
          <SelectedTag
            onClick={(event) => this.toggleOption(event)}
            onFocus={(event) => this.focusOption(event, true)}
            onBlur={(event) => this.focusOption(event, false)}
            onKeyDown={(event) => this.handleKeyDown(event)}
            onKeyUp={(event) => this.handleKeyUp(event)}
            padding={padding}
          >
            {children}
            <styled.Icon
              icon={iconDirection}
              marginLeft={displayClear && '3.4rem'}
            />
          </SelectedTag>
          <styled.OptionsWrapper
            activeMenu={activeMenu}
            size={size}
            hidden={hidden}
          >
            {optionsPosition === 'bottom' &&
              this.typeaheadEnabled() &&
              this.renderTypeahead()}
            {!isEmpty(options) ? (
              <styled.Options
                context={this.optionMenuItems()}
                maxItems={5}
                ref={(optionsItems) => {
                  this.optionsMenu = optionsItems;
                }}
              />
            ) : (
              <styled.EmptyState>
                <FormattedMessage {...i18n.noRecords} />
              </styled.EmptyState>
            )}
            {optionsPosition === 'top' &&
              this.typeaheadEnabled() &&
              this.renderTypeahead()}
          </styled.OptionsWrapper>
        </styled.Select>
      </ReactPageClick>
    );
  }
}

DropdownComponent.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      linkName: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        .isRequired,
      textValue: PropTypes.string,
    })
  ),
  optionsPosition: PropTypes.oneOf(['top', 'bottom']),
  padding: PropTypes.string,
  size: PropTypes.oneOf(['small', 'default']),
  onSelect: PropTypes.func,
  onFocus: PropTypes.func,
  children: PropTypes.node,
  intl: PropTypes.object,
  typeaheadPlaceholder: PropTypes.object,
  typeahead: PropTypes.bool,
  onTypeaheadChange: PropTypes.func,
  selectTag: PropTypes.string,
  disabled: PropTypes.bool,
  onOptionsPosition: PropTypes.func,
  optionsHeight: PropTypes.number,
  displayClear: PropTypes.bool,
  dataManual: PropTypes.string,
  active: PropTypes.string,
};

DropdownComponent.defaultProps = {
  size: 'default',
  options: [],
  optionsPosition: 'bottom',
  selectTag: 'link',
  disabled: false,
  optionsHeight: 5,
};

export const Dropdown = injectIntl(DropdownComponent);
