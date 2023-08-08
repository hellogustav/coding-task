import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components/elements/icon';
import * as styled from './styles/sortableHeader';

export class SortableHeader extends Component {
  renderIcon() {
    const { currentSorting, column } = this.props;
    const isCurrent = currentSorting.by === column;

    if (isCurrent && currentSorting.direction === 'desc') {
      return <Icon icon="CaretDown" />;
    }
    if (isCurrent) {
      return <Icon icon="CaretUp" />;
    }
    return (
      <styled.IconChevrons>
        <Icon icon="CaretUp" />
        <Icon icon="CaretDown" />
      </styled.IconChevrons>
    );
  }

  render() {
    const { label, handleClick } = this.props;

    return (
      <styled.Header onClick={handleClick}>
        <styled.Label>{label}</styled.Label>
        {this.renderIcon()}
      </styled.Header>
    );
  }
}

SortableHeader.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  column: PropTypes.string.isRequired,
  currentSorting: PropTypes.shape({
    by: PropTypes.string,
    direction: PropTypes.string,
  }).isRequired,
};
