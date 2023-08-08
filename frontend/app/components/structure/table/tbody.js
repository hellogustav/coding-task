import React from 'react';
import PropTypes from 'prop-types';

import * as styled from './styles/table';

export const Tbody = function Tbody(props) {
  const { children, ...rest } = props;

  return <styled.Tbody {...rest}>{children}</styled.Tbody>;
};

Tbody.propTypes = {
  children: PropTypes.node,
};

Tbody.defaultProps = {
  children: [],
};
