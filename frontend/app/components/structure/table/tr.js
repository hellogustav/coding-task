import React from 'react';
import PropTypes from 'prop-types';

import * as styled from './styles/table';

export const Tr = function Tr(props) {
  const { children, ...rest } = props;

  return <styled.Tr {...rest}>{children}</styled.Tr>;
};

Tr.propTypes = {
  children: PropTypes.node,
};

Tr.defaultProps = {
  children: null,
};
