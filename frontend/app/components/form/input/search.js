import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

import { Colors } from 'components/utils/styles/ui';
import { Icon } from 'components/elements/icon';
import { isEmptyString } from 'components/utils/text';

import i18n from './utils/i18n';

import * as styled from './styles/inputs';

class InputSearchComponent extends Component {
  clearText() {
    const { searchTerm, onChange } = this.props;

    if (isEmptyString(searchTerm)) {
      return;
    }

    onChange('');
  }

  inputSearchChange(searchTerm) {
    const { onChange } = this.props;
    onChange(searchTerm);
  }

  avoidSubmit(event) {
    const keyCode = event.keyCode || event.which;

    if (keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }

    return true;
  }

  render() {
    const {
      intl,
      className,
      dataManual,
      placeholder = null,
      searchTerm,
      onInnerRef,
      iconPosition,
      iconColor,
    } = this.props;

    const inputPlaceholder = placeholder || i18n.search;

    const icon = isEmptyString(searchTerm) ? 'MagnifyingGlass' : 'X';
    const iconSize = isEmptyString(searchTerm) ? 'large' : 'small';
    const iconColorValue = isEmptyString(searchTerm)
      ? Colors[iconColor]
      : Colors.white;

    return (
      <div style={{ position: 'relative' }}>
        <styled.InputSearch
          className={className}
          data-manual={dataManual}
          type="search"
          value={searchTerm}
          placeholder={intl.formatMessage(inputPlaceholder)}
          onChange={(event) => this.inputSearchChange(event.target.value)}
          onKeyPress={(event) => this.avoidSubmit(event)}
          ref={(ref) => onInnerRef && onInnerRef(ref)}
          iconPosition={iconPosition}
        />
        <styled.SearchIcon
          iconPosition={iconPosition}
          iconType={icon}
          onClick={() => this.clearText()}
        >
          <Icon icon={icon} size={iconSize} color={iconColorValue} />
        </styled.SearchIcon>
      </div>
    );
  }
}

InputSearchComponent.propTypes = {
  className: PropTypes.string,
  searchTerm: PropTypes.string.isRequired,
  placeholder: PropTypes.object,
  intl: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onInnerRef: PropTypes.func,
  dataManual: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  iconColor: PropTypes.oneOf(Object.keys(Colors)),
};

InputSearchComponent.defaultProps = {
  iconPosition: 'right',
  iconColor: 'text',
};

export const InputSearch = injectIntl(InputSearchComponent);
