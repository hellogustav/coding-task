import React from 'react';
import PropTypes from 'prop-types';

import * as styled from './styles/table';

export const Table = function Table(props) {
  const { children, ...rest } = props;

  return <styled.Table {...rest}>{children}</styled.Table>;
};

Table.propTypes = {
  children: PropTypes.node,
  isBordered: PropTypes.bool,
};

Table.defaultProps = {
  children: [],
  isBordered: false,
};
