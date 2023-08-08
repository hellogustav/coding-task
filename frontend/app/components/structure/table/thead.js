import React from 'react';
import PropTypes from 'prop-types';

import * as styled from './styles/table';

export const Thead = function Thead(props) {
  const { children, ...rest } = props;

  return <styled.Thead {...rest}>{children}</styled.Thead>;
};

Thead.propTypes = {
  children: PropTypes.node,
};

Thead.defaultProps = {
  children: [],
};
