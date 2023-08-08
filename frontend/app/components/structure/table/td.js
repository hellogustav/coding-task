import React from 'react';
import PropTypes from 'prop-types';

import * as styled from './styles/table';

export const Td = function Td(props) {
  const { children, ...rest } = props;

  return <styled.Td {...rest}>{children}</styled.Td>;
};

Td.propTypes = {
  children: PropTypes.node,
  noPadding: PropTypes.bool,
  noWrap: PropTypes.bool,
  rightAligned: PropTypes.bool,
};

Td.defaultProps = {
  children: [],
  noPadding: false,
  noWrap: false,
  rightAligned: false,
};
